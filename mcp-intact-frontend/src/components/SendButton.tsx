import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface SendButtonProps {
  onSend: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onSend }) => {
  return (
    <TouchableOpacity
      onPress={onSend}
      style={tw`bg-blue-500 py-2 px-4 rounded`}
    >
      <Text style={tw`text-center text-white`}>Send</Text>
    </TouchableOpacity>
  );
};

export default SendButton;