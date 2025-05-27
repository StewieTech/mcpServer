import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import PromptInput from '../components/PromptInput';
import ResponseDisplay from '../components/ResponseDisplay';
import useMcpApi from '../hooks/useMcpApi';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';

import { ColorValue } from 'react-native';

const pastelGradient: [ColorValue, ColorValue, ...ColorValue[]] = [
  '#F6DDEE', // blush pink
  '#F3EFF3', // soft grey
  '#A36CA5', // lavender
  '#C3AED6', // lilac
];

const MainScreen: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const { sendPrompt, loading } = useMcpApi();

  const handleSendPrompt = async (prompt: string) => {
    setResponse(''); // Clear previous response
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
                    {/* Heading */}
                    <View style={tw`items-center mb-6`}>
                        <Text style={tw`text-3xl font-thin text-purple-900 text-center font-montserrat`}>
                            Welcome to Technocrats
                        </Text>
                        <Text style={tw`text-3xl font-thin text-purple-900 text-center font-montserrat`}>
                            MCP Server
                        </Text>
                    </View>
                    {/* Prompt Input */}
                    <PromptInput onSend={handleSendPrompt} disabled={loading}/>
                    {/* Response Display */}
                    <View style={tw`w-full mt-4`}>
                        <ResponseDisplay response={response} loading={loading}/>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default MainScreen;