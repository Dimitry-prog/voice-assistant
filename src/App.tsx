import React, { useState, ChangeEvent } from 'react';

import useRecordVoice from './hooks/useRecordVoice';
import RecordVoice from './components/RecordVoice';
import AnswerFromGPT from './components/AnswerFromGPT';

function App() {
  const [lang, setLang] = useState<string>('');
  const { recordedText, isRecording, handleStartRecordVoice } = useRecordVoice({ lang: lang });

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
  };
  return (
    <div className="w-full h-screen grid gap-4 place-content-center justify-items-center bg-gray-700">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <RecordVoice
        recordedText={recordedText}
        isRecording={isRecording}
        handleStartRecordVoice={handleStartRecordVoice}
        handleChangeSelect={handleChangeSelect}
      />
      <AnswerFromGPT lang={lang} recordedText={recordedText} />
    </div>
  );
}

export default App;
