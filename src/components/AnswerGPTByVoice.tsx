import { useAppSelector } from '../hooks/reduxHooks';
import useTextToVoice from '../hooks/useTextToVoice';
import { useEffect, useState } from 'react';

const AnswerGptByVoice = () => {
  const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt);
  const { isListening, handleStartTextByVoice } = useTextToVoice({ text: gptPrompt });
  const [isShow, setIsShow] = useState<boolean>(true);

  const handleCancel = () => {
    setIsShow(false);
  };

  useEffect(() => {
    setIsShow(true);
  }, [gptPrompt]);

  return (
    <>
      {gptPrompt && isShow && (
        <>
          <span className="text-xl text-white/90">Would you like to listening this text</span>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleStartTextByVoice}
              className="w-fit text-2xl text-white/90 disabled:opacity-20"
              type="button"
              aria-label="reading text"
              disabled={isListening}
            >
              Yes 👂
            </button>
            <button
              onClick={handleCancel}
              className="w-fit text-2xl text-white/90 disabled:opacity-20"
              type="button"
              aria-label="reading text"
              disabled={isListening}
            >
              No ❌
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AnswerGptByVoice;
