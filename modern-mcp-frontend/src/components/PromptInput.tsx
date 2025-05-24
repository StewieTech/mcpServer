import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import  tw  from 'tailwind-react-native-classnames';

interface PromptInputProps {
  onSend: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend }) => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (prompt.trim()) {
      onSend(prompt);
      setPrompt('');
    }
  };

  return (
    <View style={tw`flex-row items-center`}>
      <TextInput
        style={tw`border border-gray-300 rounded p-2 flex-1`}
        placeholder="Type your prompt here..."
        value={prompt}
        onChangeText={setPrompt}
      />
      <TouchableOpacity
        style={tw`bg-blue-500 px-4 py-2 rounded ml-2`}
        onPress={handleSend}
      >
        <Text style={tw`text-white font-bold`}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PromptInput;