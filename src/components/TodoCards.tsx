import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import ExportDropdown from './ExportDropdown';
import { useAppSelector } from '../hooks/reduxHooks';
import { GPTAnswerType } from '../types/promptTypes';

const TodoCards = () => {
  const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt);
  const [gptAnswer, setGptAnswer] = useState<GPTAnswerType[]>([]);

  useEffect(() => {
    if (gptPrompt) {
      setGptAnswer(JSON.parse(gptPrompt));
    }
  }, [gptPrompt]);

  return (
    <>
      <div className="mb-2 min-h-[450px] border">
        {gptPrompt && (
          <ul>
            {gptAnswer.map((item) => (
              <TodoCard key={item.id} {...item} />
            ))}
          </ul>
        )}
      </div>
      <ExportDropdown gptAnswer={gptAnswer} />
    </>
  );
};

export default TodoCards;
