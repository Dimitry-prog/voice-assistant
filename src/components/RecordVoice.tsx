import { ChangeEvent, useState } from 'react';
import useRecordVoice from '../hooks/useRecordVoice';

const RecordVoice = () => {
  const [lang, setLang] = useState<string>('');
  const { recordedText, isRecording, handleStartRecordVoice } = useRecordVoice({ lang: lang });

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <select onChange={handleChangeSelect}>
        <option value="" disabled>
          Choose language
        </option>
        <option value="en-US">English</option>
        <option value="ru-RU">Russian</option>
      </select>
      <button
        onClick={handleStartRecordVoice}
        className="w-fit text-2xl text-white/90 disabled:opacity-20"
        disabled={isRecording}
      >
        {isRecording ? '⏺️ Recording...' : '️🎙️ Record Voice'}
      </button>
      <div className="max-w-md text-white/80">{recordedText}</div>
    </div>
  );
};

export default RecordVoice;
