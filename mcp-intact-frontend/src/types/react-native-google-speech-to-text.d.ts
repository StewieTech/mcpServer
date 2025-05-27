// filepath: mcp-intact-frontend/src/@types/react-native-google-speech-to-text.d.ts
declare module 'react-native-google-speech-to-text' {
  const SpeechToText: {
    startSpeech(prompt: string, language: string): Promise<any>;
  };
  export default SpeechToText;
}