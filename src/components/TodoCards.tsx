import React, { useState } from 'react';
import TodoCard from './TodoCard';
import ExportDropdown from './ExportDropdown';
import { useAppSelector } from '../hooks/reduxHooks';
import Preloader from './Preloader/Preloader';

type SelectedCardProps = {
  id: string;
  role: string;
  start: string;
  end: string;
  description: string;
};

const TodoCards = () => {
  const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt);
  const status = useAppSelector((state) => state.prompt.status);
  const [checkboxStates, setCheckboxStates] = useState<{ [id: string]: boolean }>({});

  const noParents = gptPrompt.filter((parent) => parent.parentId === null);

  const [selectedCards, setSelectedCards] = useState<SelectedCardProps[]>([]);
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

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
                onCheckboxChange={handleCheckboxChange}
                checkboxStates={checkboxStates}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
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
