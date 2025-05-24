import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PromptInput from '../components/PromptInput';
import SendButton from '../components/SendButton';
import ResponseDisplay from '../components/ResponseDisplay';
import useMcpApi from '../hooks/useMcpApi';

const MainScreen: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const { sendPrompt } = useMcpApi();

    const handleSendPrompt = async () => {
        const result = await sendPrompt(prompt);
        setResponse(result);
        setPrompt('');
    };

    return (
        <View className="flex-1 justify-center items-center p-4">
            <Text className="text-2xl font-bold mb-4">MCP Prompt System</Text>
            <PromptInput prompt={prompt} setPrompt={setPrompt} />
            <SendButton onSend={handleSendPrompt} />
            <ResponseDisplay response={response} />
        </View>
    );
};

export default MainScreen;