import React, { useState, useEffect } from 'react';
import TodoCard from './TodoCard';
import ExportDropdown from './ExportDropdown';
import { useAppSelector } from '../hooks/reduxHooks';
import { removeDuplicateCardsByRole } from '../utils/removeDuplicateCardsByRole';
import Preloader from './Preloader/Preloader';

const LIST_NAMES = ['Done', 'Blocked', 'Review', 'Pending', 'Backlog'];

import { authTrello, createBoard, createLists, createLabel, createCards } from '../api/trelloapi';

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
  const [token, setToken] = useState('');

  const noParents = gptPrompt.filter((parent) => parent.parentId === null);

  const [selectedCards, setSelectedCards] = useState<SelectedCardProps[]>([]);
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.hash.substr(1));

    const token = params.get('token');

    if (token) {
      setToken(token);
    }
  }, []);
  const authClick = () => {
    authTrello();
  };
  const exportClick = async () => {
    if (token) {
      const boardId = await createBoard(token, 'PMAI Board');
      const listIds = await createLists(token, boardId);
      const roles = removeDuplicateCardsByRole(selectedCards);
      const labelId = await createLabel(token, boardId, roles);
      const backlogListId = listIds[LIST_NAMES.indexOf('Backlog')];
      for (const selectedCard of selectedCards) {
        await createCards(token, backlogListId, labelId, selectedCard);
      }
    } else {
      console.log('Нажмите 2 кнопку');
    }
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
      <div className="flex mt-2 text-base">
        <ExportDropdown gptAnswer={gptPrompt} modifiedTodoCards={selectedCards} />
        <button
          onClick={authClick}
          className="inline-block w-52 mr-4 justify-between text-left bg-green p-3 hover:opacity-70 border border-gray rounded-lg"
        >
          Зарегаться в Trello
        </button>
        <button
          onClick={exportClick}
          className="inline-block w-52 mr-4 justify-between text-left bg-green p-3 hover:opacity-70 border border-gray rounded-lg"
        >
          Создать у себя доску
        </button>
      </div>
    </>
  );
};

export default TodoCards;
