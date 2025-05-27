import { useEffect, useState, useCallback } from 'react';
import Voice from '@react-native-voice/voice';

export const useSpeechToText = () => {
  const [result, setResult] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setResult(e.value[0]);
      }
    };
    Voice.onSpeechError = (e) => {
      setError(e.error?.message || 'Unknown error');
      setIsListening(false);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = useCallback(async () => {
    setError(null);
    setResult('');
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (e: any) {
      setError(e.message);
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  return { result, isListening, error, startListening, stopListening, setResult };
};