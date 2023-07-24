import { useEffect, useState } from 'react';
import { useAppSelector } from './reduxHooks';

type UseTextToVoicePropsType = {
  text: string;
};

type UseTextToVoiceReturnType = {
  isListening: boolean;
  handleStartTextByVoice: () => void;
};

const useTextToVoice = ({ text }: UseTextToVoicePropsType): UseTextToVoiceReturnType => {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const lang = useAppSelector((state) => state.prompt.lang);

  const textToVoice: SpeechSynthesis = window.speechSynthesis;
  const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();

  utterance.voice = voice;
  utterance.text = text;
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onend = () => {
    setIsListening(false);
  };

  const handleStartTextByVoice = () => {
    textToVoice.speak(utterance);
    setIsListening(true);
  };

  const getVoices = () => {
    const voices: SpeechSynthesisVoice[] = textToVoice.getVoices();
    setVoices(voices);
  };

  useEffect(() => {
    if (lang === 'english') {
      setVoice(voices[0]);
    } else {
      setVoice(voices[18]);
    }
  }, [lang]);

  useEffect(() => {
    getVoices();
    if (textToVoice.onvoiceschanged !== undefined) {
      textToVoice.onvoiceschanged = getVoices;
    }
  }, []);

  useEffect(() => {
    if (!textToVoice) {
      console.log('Web Speech API is not supported in this browser');
    }

    return () => {
      textToVoice.cancel();
    };
  }, [textToVoice]);

  return {
    isListening,
    handleStartTextByVoice,
  };
};

export default useTextToVoice;
