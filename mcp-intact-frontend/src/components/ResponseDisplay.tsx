import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface ResponseDisplayProps {
  response: string | null;
  loading: boolean;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, loading }) => {
  let content;
  if (loading) {
    content = (
      <View style={tw`flex items-center justify-center py-4`}>
        <ActivityIndicator size="large" color="#A36CA5" />
      </View>
    );
  } else if (response) {
    content = (
      <View style={tw`flex-row items-start space-x-2`}>
        <Text style={tw`text-lg text-gray-800 flex-1`}>{response}</Text>
        <AntDesign name="checkcircle" size={20} color="#4CAF50" />
      </View>
    );
  } else {
    content = (
      <Text style={tw`text-lg text-gray-400`}>No response yet.</Text>
    );
  }

  return (
    <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
      {content}
    </View>
  );
};

export default ResponseDisplay;