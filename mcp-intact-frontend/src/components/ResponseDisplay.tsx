import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import CreateSpeech from './CreateSpeech';

interface ResponseDisplayProps {
  response: string | null;
  loading: boolean;
  audioResetKey: number;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ 
  response, 
  loading, 
  audioResetKey
}) => {
  if (loading) {
    return (
      <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
        <View style={tw`flex items-center justify-center py-4`}>
          <ActivityIndicator size="large" color="#A36CA5" />
        </View>
      </View>
    );
  }

  if (!response) {
    return (
      <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
        <Text style={tw`text-lg text-gray-400`}>No response yet.</Text>
      </View>
    );
  }

  return (
    <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
      <View style={tw`flex-row items-start justify-between`}>
        <View style={tw`flex-1 mr-4`}>
          <Text style={tw`text-lg text-gray-800`}>{response}</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <AntDesign name="checkcircle" size={20} color="#4CAF50" />
          <CreateSpeech text={response} resetKey={audioResetKey} />
        </View>
      </View>
    </View>
  );
};

export default ResponseDisplay;