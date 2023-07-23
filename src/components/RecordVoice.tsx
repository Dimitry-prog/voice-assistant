import React, { ChangeEvent } from 'react';

interface RecordVoiceProps {
  handleChangeSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleStartRecordVoice: () => void;
  isRecording: boolean;
  recordedText: string;
}

const RecordVoice: React.FC<RecordVoiceProps> = ({
  handleChangeSelect,
  handleStartRecordVoice,
  isRecording,
  recordedText,
}) => {
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
