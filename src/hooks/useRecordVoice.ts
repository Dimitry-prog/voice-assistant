import { useEffect, useState } from 'react';
import { useAppDispatch } from './reduxHooks';
import { promptActions } from '../store/slices/promptSlice';
// import { getGPTPrompt } from '../api/promptApi';
// import { REQUEST_OPENAI_DATA } from '../utils/constants';

type UseRecordVoicePropsType = {
  lang: string;
};

type UseRecordVoiceReturnType = {
  recordedText: string;
  isRecording: boolean;
  handleStartRecordVoice: () => void;
};

const useRecordVoice = ({ lang }: UseRecordVoicePropsType): UseRecordVoiceReturnType => {
  const [recordedText, setRecordedText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition: SpeechRecognition = new SpeechRecognition();

  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  let text = '';

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    text = Array.from(event.results)
      .map((result) => result[0])
      .map((text) => text.transcript)
      .join('');

    setRecordedText(text);
  };

  recognition.onstart = () => {
    setRecordedText('');
    setIsRecording(true);
  };

  recognition.onend = () => {
    setIsRecording(false);
    dispatch(promptActions.setUserPrompt(text));
  };

  const handleStartRecordVoice = () => {
    recognition.start();
  };

  useEffect(() => {
    if (!SpeechRecognition) {
      console.log('Web Speech API is not supported in this browser');
    }

    return () => {
      recognition.abort();
    };
  }, [SpeechRecognition]);

  return {
    recordedText,
    handleStartRecordVoice,
    isRecording,
  };
};

export default useRecordVoice;
