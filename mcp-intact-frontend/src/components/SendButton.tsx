import React, { useState } from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface SendButtonProps {
  onSend: () => void;
  disabled?: boolean;
}

const SendButton: React.FC<SendButtonProps> = ({ onSend, disabled }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPress={onSend}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        tw`ml-2 px-5 py-2 rounded-2xl`,
        { backgroundColor: pressed ? '#A36CA5' : '#F6DDEE', opacity: disabled ? 0.5 : 1 },
        Platform.OS === 'web' && pressed ? { transform: [{ scale: 1.05 }] } : {},
        tw`shadow-lg`,
      ]}
    >
      <Text style={tw`text-base font-semibold text-purple-900`}>Send</Text>
    </TouchableOpacity>
  );
};

export default SendButton;