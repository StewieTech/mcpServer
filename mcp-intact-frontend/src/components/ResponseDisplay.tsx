import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface ResponseDisplayProps {
  response: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
      {response ? (
        <Text style={tw`text-lg text-gray-800`}>{response}</Text>
      ) : (
        <Text style={tw`text-lg text-gray-400`}>No response yet.</Text>
      )}
    </View>
  );
};

export default ResponseDisplay;