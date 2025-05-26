import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PromptInput from '../components/PromptInput';
import ResponseDisplay from '../components/ResponseDisplay';
import useMcpApi from '../hooks/useMcpApi';
import tw from 'tailwind-react-native-classnames';

const MainScreen: React.FC = () => {
    const [response, setResponse] = useState<string>('');
    const { sendPrompt } = useMcpApi();

    const handleSendPrompt = async (prompt: string) => {
        console.log('Prompt sent:', prompt);
        const result = await sendPrompt(prompt);
        console.log('Response received', result);
        setResponse(result);
    };

    return (
        <View style={tw`flex-1 justify-center items-center p-4`}>
            <Text style={tw`text-2xl font-bold mb-4`}>MCP Prompt System</Text>
            <PromptInput onSend={handleSendPrompt} />
            <ResponseDisplay response={response} />
        </View>
    );
};

export default MainScreen;