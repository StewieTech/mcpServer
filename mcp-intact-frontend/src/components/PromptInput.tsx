import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'tailwind-react-native-classnames';
import SendButton from './SendButton';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  disabled?: boolean;
}

const predefinedPrompts = [
  { id: 'select', label: 'Select a prompt...', value: '' },
  { id: 'customers', label: 'How many active customers are there?', value: 'How many active customers are there?' },
  { id: 'email', label: 'Send morning touchbase email', value: 'Send an email to sghaz.intact@gmail.com with subject, Morning touchbase. The email should be, asking the receipient to join the meeting' },
  { id: 'policies', label: 'Auto and Home policies value', value: 'What\'s the total value of Auto and Home policies signed this year?' },
  { id: 'jeff', label: 'Jeff Crowe\'s claims', value: 'Email me the Claims details for Jeff Crowe\'s most recent claim' },
  { id: 'vehicles', label: 'Give me the list of vehicles', value: 'Give me the list of vehicles' },
  { id: 'custom', label: 'Custom prompt...', value: '' },
];

const PromptInput: React.FC<PromptInputProps> = ({ onSend, disabled }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedPromptId, setSelectedPromptId] = useState('select');

  const handlePromptChange = (promptId: string) => {
    setSelectedPromptId(promptId);
    const selectedPrompt = predefinedPrompts.find(p => p.id === promptId);
    setPrompt(selectedPrompt?.value || '');
  };

  const handleSend = () => {
    if (prompt.trim()) {
      onSend(prompt);
      setPrompt('');
      setSelectedPromptId('select');
    }
  };

  const isCustomPrompt = selectedPromptId === 'custom';
  const isPromptSelected = selectedPromptId !== 'select';

  return (
    <View style={tw`w-full`}>
      <View style={tw`mb-2 bg-white rounded-xl shadow-sm overflow-hidden`}>
        <Picker
          selectedValue={selectedPromptId}
          onValueChange={handlePromptChange}
          style={tw`bg-white px-4 py-2`}
          enabled={!disabled}
        >
          {predefinedPrompts.map(prompt => (
            <Picker.Item 
              key={prompt.id} 
              label={prompt.label} 
              value={prompt.id}
              color="#A36CA5"
            />
          ))}
        </Picker>
      </View>
      
      <View style={tw`flex-row items-center w-full bg-white rounded-2xl shadow-lg px-4 py-3`}>
        <TextInput
          style={tw`flex-1 text-base font-light ${isPromptSelected ? 'text-purple-900' : 'text-gray-400'}`}
          placeholder="Select a prompt or type your own..."
          placeholderTextColor="#C3AED6"
          value={prompt}
          onChangeText={setPrompt}
          editable={isCustomPrompt}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          multiline={true}
          numberOfLines={2}
        />
        <SendButton 
          onSend={handleSend} 
          disabled={disabled || !prompt.trim() || !isPromptSelected} 
        />
      </View>
    </View>
  );
};

export default PromptInput;