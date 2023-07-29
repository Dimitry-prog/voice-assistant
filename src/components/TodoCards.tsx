import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import ExportDropdown from './ExportDropdown';
import { useAppSelector } from '../hooks/reduxHooks';
import { GPTAnswerType } from '../types/promptTypes';

const TodoCards = () => {
  const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt);
  const [gptAnswer, setGptAnswer] = useState<GPTAnswerType[]>([]);
  const [checkboxStates, setCheckboxStates] = useState<{ [id: string]: boolean }>({});

  const modifiedTodoCards = gptAnswer.filter((item) => checkboxStates[item.id]);

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [id]: isChecked,
    }));
  };

  useEffect(() => {
    if (gptPrompt) {
      setGptAnswer(JSON.parse(gptPrompt));
    }
  }, [gptPrompt]);

  return (
    <>
      <div className="mb-2 mt-10 p-4 min-h-[450px] border border-gray rounded-lg">
        {gptPrompt && (
          <ul>
            {gptAnswer.map((item) => (
              <TodoCard
                key={item.id}
                {...item}
                isChecked={!!checkboxStates[item.id]}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ul>
        )}
      </div>
      <ExportDropdown gptAnswer={gptAnswer} modifiedTodoCards={modifiedTodoCards} />
    </>
  );
};

export default TodoCards;
