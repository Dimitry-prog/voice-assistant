import React, { useState, useEffect } from 'react';
import TodoCard from './TodoCard';
import ExportDropdown from './ExportDropdown';
import { useAppSelector } from '../hooks/reduxHooks';
import Preloader from './Preloader/Preloader';
import { GPTAnswerType } from '../types/promptTypes';
import { v4 as uuidv4 } from 'uuid';

type TodoCardProps = {
  id: string;
  role: string;
  start: string;
  end: string;
  description: string;
  cardName: string;
  isChecked: boolean;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
  checkboxStates: { [id: string]: boolean };
  prompt: GPTAnswerType;
  prompts: GPTAnswerType[];
  selectedCards: TodoCardProps[];
  setSelectedCards: React.Dispatch<React.SetStateAction<TodoCardProps[]>>;
};

const TodoCards = () => {
  const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt).map((parent) => {
    return {
      ...parent,
      parentId: null,
      id: uuidv4(),
    };
  });
  const status = useAppSelector((state) => state.prompt.status);
  const [checkboxStates, setCheckboxStates] = useState<{ [id: string]: boolean }>({});

  const noParents = gptPrompt.filter((parent) => parent.parentId === null);

  const [selectedCards, setSelectedCards] = useState<TodoCardProps[]>([]);
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  // console.log(gptPrompt);
  // console.log(noParents);

  return (
    <>
      <div className="mb-2 mt-10 p-4 min-h-[450px] border border-gray rounded-lg">
        {status === 'loading' ? (
          <Preloader />
        ) : (
          <ul className="flex flex-col gap-2">
            {noParents.map((item) => (
              <TodoCard
                prompt={item}
                prompts={gptPrompt}
                key={item.id}
                {...item}
                isChecked={!!checkboxStates[item.id]}
                onCheckboxChange={handleCheckboxChange}
                checkboxStates={checkboxStates}
              />
            ))}
          </ul>
        )}
      </div>
      <ExportDropdown gptAnswer={gptPrompt} modifiedTodoCards={selectedCards} />
    </>
  );
};

export default TodoCards;
