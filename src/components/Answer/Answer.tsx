import React from 'react';

interface AnswerProps {
  isDataLoad: boolean;
  message: string;
}

const Answer: React.FC<AnswerProps> = ({ isDataLoad, message }) => {
  return (
    <>
      {isDataLoad ? (
        <div>Грузится ответ с OpenAI... (желательно прикрутить анимацию)</div>
      ) : (
        <div className="m-5">{message}</div>
      )}
    </>
  );
};

export default Answer;
