import { ChangeEvent, useState } from 'react';
import useRecordVoice from '../hooks/useRecordVoice';
import { useAppDispatch } from '../hooks/reduxHooks';
import { promptActions } from '../store/slices/promptSlice';
import { LANGUAGES } from '../utils/constants';

const RecordVoice = () => {
  const dispatch = useAppDispatch();
  const [lang, setLang] = useState<string>('');
  const { recordedText, isRecording, handleStartRecordVoice } = useRecordVoice({
    lang: LANGUAGES[lang as keyof typeof LANGUAGES],
  });

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
    dispatch(promptActions.setLang(event.target.value));
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <select onChange={handleChangeSelect}>
        <option value="" disabled>
          Choose language
        </option>
        <option value="english">English</option>
        <option value="russian">Russian</option>
      </select>
      <button
        onClick={handleStartRecordVoice}
        className="w-fit text-2xl text-white/90 disabled:opacity-20"
        disabled={isRecording}
      >
        {isRecording ? '⏺️ Recording...' : '️🎙️ Record Voice'}
      </button>
      {recordedText && <div className="max-w-md text-white/80">{recordedText}</div>}
    </div>
  );
};

export default RecordVoice;
