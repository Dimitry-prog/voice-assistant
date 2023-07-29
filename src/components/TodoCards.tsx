import React, { useState } from 'react';
import TodoCard from './TodoCard';
import ExportDropdown from './ExportDropdown';
import { useAppSelector } from '../hooks/reduxHooks';

const TodoCards = () => {
  const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt);
  const status = useAppSelector((state) => state.prompt.status);
  const [checkboxStates, setCheckboxStates] = useState<{ [id: string]: boolean }>({});

  const modifiedTodoCards = gptPrompt.filter((item) => checkboxStates[item.id]);
  const noParents = gptPrompt.filter((parent) => parent.parentId === null);

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [id]: isChecked,
    }));
  };

  return (
    <>
      <div className="mb-2 mt-10 p-4 min-h-[450px] border border-gray rounded-lg">
        {status === 'loading' ? (
          <div className="block text-center">Загрузка...</div>
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
              />
            ))}
          </ul>
        )}
      </div>
      <ExportDropdown gptAnswer={gptPrompt} modifiedTodoCards={modifiedTodoCards} />
    </>
  );
};

export default TodoCards;
