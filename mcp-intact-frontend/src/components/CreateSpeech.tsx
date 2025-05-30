import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ActivityIndicator, Platform, Alert, Text } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import tw from "tailwind-react-native-classnames";

interface Props {
  text: string;
  resetKey?: number; // Key to reset audio state
}

// Replace localhost with your computer's IP address
const SPEECH_API_URL = Platform.select({
  web: "http://localhost:5002/api/speech",
  default: "http://172.20.10.4:5002/api/speech"  // Replace X with your actual IP
});

const CreateSpeech: React.FC<Props> = ({ text, resetKey}) => {
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  // Initialize Audio SDK
  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: false
        });
        console.log('Audio SDK initialized');
      } catch (err) {
        console.error('Failed to initialize Audio SDK:', err);
      }
    };
    
    initAudio();
    
    // Cleanup function
    return () => {
      if (sound) {
        console.log('Unloading sound on cleanup');
        sound.unloadAsync();
      }
    };
  }, []);

    useEffect(() => {
    const resetAudio = async () => {
      if (sound) {
        console.log('Resetting audio state');
        await sound.unloadAsync();
        setSound(null);
      }
      setAudioUri(null);
      setPlaying(false);
    };
    
    resetAudio();
  }, [resetKey]);

  const fetchAudio = async () => {
    if (!text.trim()) {
      console.log('No text provided to convert to speech');
      return;
    }

    setLoading(true);
    try {
      console.log('Sending request to speech API with text:', text);
      const res = await fetch(SPEECH_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      
      console.log('Response status:', res.status);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`API error: ${errorData.error}`);
      }

      const contentType = res.headers.get('content-type');
      console.log('Response content-type:', contentType);

      if (contentType?.includes('audio/mpeg')) {
        const blob = await res.blob();
        console.log('Received audio blob, size:', blob.size);

        if (Platform.OS === 'web') {
          const uri = URL.createObjectURL(blob);
          console.log('Created web URL:', uri);
          setAudioUri(uri);
        } else {
          // For mobile platforms
          const fileUri = `${FileSystem.cacheDirectory}temp_audio_${Date.now()}.mp3`;
          const fr = new FileReader();
          fr.onload = async () => {
            const base64Data = (fr.result as string).split(',')[1];
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            });
            console.log('Saved audio to mobile file:', fileUri);
            setAudioUri(fileUri);
          };
        fr.readAsDataURL(blob);
      }
    } else {
      throw new Error(`Unexpected content-type: ${contentType}`);
    }
  } catch (err) {
    console.error('Error fetching audio:', err);
    const errorMessage = Platform.OS === 'web' 
      ? (err as Error).message
      : `Network error. Make sure the server is running at ${SPEECH_API_URL}`;
    Alert.alert('Error', 'Failed to fetch audio: ' + errorMessage);
  } finally {
    setLoading(false);
  }
};

  const playAudio = async () => {
    try {
      // Unload any existing sound first
      if (sound) {
        console.log('Unloading previous sound');
        await sound.unloadAsync();
        setSound(null);
      }

      if (!audioUri) {
        console.log('No audio URI, fetching audio...');
        await fetchAudio();
        return;
      }

      console.log('Loading sound from URI:', audioUri);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true },
        (status) => console.log('Playback status:', status)
      );

      setSound(newSound);
      setPlaying(true);

      newSound.setOnPlaybackStatusUpdate(status => {
        console.log('Playback status update:', status);
        if (!status.isLoaded) {
          console.log('Audio unloaded');
          setPlaying(false);
        } else if (status.didJustFinish) {
          console.log('Audio finished playing');
          setPlaying(false);
          newSound.unloadAsync();
        }
      });

      await newSound.playAsync();
    } catch (err) {
      console.error('Error playing audio:', err);
      Alert.alert('Error', 'Failed to play audio: ' + (err as Error).message);
      setPlaying(false);
    }
  };

  return (
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity
        onPress={playAudio}
        disabled={loading || playing}
        style={tw`p-2 flex-row items-center`}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#A36CA5" />
        ) : (
          <View style={tw`flex-row items-center`}>
            <AntDesign 
              name="sound" 
              size={28} 
              color={playing ? "#A36CA5" : "#4CAF50"} 
            />
            {playing && <Text style={tw`ml-2 text-purple-700`}>Playing...</Text>}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateSpeech;