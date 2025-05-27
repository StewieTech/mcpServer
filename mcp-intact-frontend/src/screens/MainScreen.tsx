import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import PromptInput from '../components/PromptInput';
import ResponseDisplay from '../components/ResponseDisplay';
import useMcpApi from '../hooks/useMcpApi';
import { LinearGradient } from 'expo-linear-gradient';
import { useSpeechToText } from '../components/SpeechToTextFun'; // Assuming this is the correct path
import tw from 'tailwind-react-native-classnames';
// import { BellIcon } from 'react-native-heroicons/outline';

import { ColorValue } from 'react-native';

const pastelGradient: [ColorValue, ColorValue, ...ColorValue[]] = [
  '#F6DDEE', // blush pink
  '#F3EFF3', // soft grey
  '#A36CA5', // lavender
  '#C3AED6', // lilac
];

const MainScreen: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const { sendPrompt } = useMcpApi();

  const handleSendPrompt = async (prompt: string) => {
    const result = await sendPrompt(prompt);
    setResponse(result);
  };

  return (
    <LinearGradient
      colors={pastelGradient}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={tw`flex-1`}
    >
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 px-4 py-6 justify-center items-center`}>
          {/* Notification Bell */}
          <View style={tw`w-full flex-row justify-end mb-2`}>
            {/* <BellIcon size={28} color="#A36CA5" /> */}
          </View>
          {/* Heading */}
          <Text style={tw`text-3xl font-thin text-purple-900 mb-6 font-montserrat`}>
            MCP Prompt System
          </Text>
          {/* Prompt Input */}
          <PromptInput onSend={handleSendPrompt} />
          {/* Speech to Text */}
          <View style={tw`mt-4`}>
            <Button
              title="Use Your Voice"
              onPress={useSpeechToText}
              color="#A36CA5"
            />
          </View>
          {/* Response Display */}
          <View style={tw`w-full mt-4`}>
            <ResponseDisplay response={response} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainScreen;