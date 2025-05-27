import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import SendButton from './SendButton';
// import { useSpeechToText } from './SpeechToTextFun';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  disabled?: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSend, disabled }) => {
  const [prompt, setPrompt] = useState('');
  // const { result, isListening, startListening, stopListening, setResult } = useSpeechToText();

  // // When speech-to-text result changes, update the prompt input
  // useEffect(() => {
  //   if (result) {
  //     setPrompt(result);
  //     setResult(''); // clear result after setting
  //   }
  // }, [result, setResult]);

  const handleSend = () => {
    if (prompt.trim()) {
      onSend(prompt);
      setPrompt('');
    }
  };

  return (
    <View style={tw`flex-row items-center w-full bg-white rounded-2xl shadow-lg px-4 py-3`}>
      <TextInput
        style={tw`flex-1 text-base font-light text-purple-900`}
        placeholder="Type your prompt..."
        placeholderTextColor="#A36CA5"
        value={prompt}
        onChangeText={setPrompt}
        editable={!disabled}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      {/* <TouchableOpacity
        onPress={isListening ? stopListening : startListening}
        style={tw`mx-2`}
        disabled={disabled}
      > */}
        {/* <MaterialCommunityIcons
          name="microphone"
          size={28}
          color={isListening ? "#A36CA5" : "#C3AED6"}
        /> */}
      {/* </TouchableOpacity> */}
      <SendButton onSend={handleSend} disabled={disabled || !prompt.trim()} />
    </View>
  );
};

export default PromptInput;