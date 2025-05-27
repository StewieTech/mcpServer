import React from 'react';
import { View, Text, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface ResponseDisplayProps {
  response: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [response]);

  return (
    <Animated.View
      style={[
        tw`rounded-2xl bg-white shadow-lg px-5 py-6 min-h-20`,
        { opacity: fadeAnim },
      ]}
    >
      {response ? (
        <Text style={tw`text-base text-purple-900 font-light`}>{response}</Text>
      ) : (
        <Text style={tw`text-base text-gray-400 font-light`}>No response yet.</Text>
      )}
    </Animated.View>
  );
};

export default ResponseDisplay;