import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface SendButtonProps {
  onSend: () => void;
}

const SendButton: React.FC<SendButtonProps> = ({ onSend }) => {
  return (
    <TouchableOpacity
      onPress={onSend}
      className="bg-blue-500 text-white py-2 px-4 rounded"
    >
      <Text className="text-center">Send</Text>
    </TouchableOpacity>
  );
};

export default SendButton;