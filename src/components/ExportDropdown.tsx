import React, { useState } from 'react';
import { createNewCard, deleteAllCards } from '../api/trelloapi';

import arrowDownUrl from '../images/fe_arrow-down.svg';

type TodoCardProps = {
  gptAnswer: CardData[];
  modifiedTodoCards: CardData[];
};
type CardData = {
  role: string;
  start: string;
  end: string;
  description: string;
  cardName: string;
};

const ExportDropdown = ({ gptAnswer, modifiedTodoCards }: TodoCardProps) => {
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });
  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });
  const handleAllClick = (): void => {
    deleteAllCards();
    gptAnswer.forEach((cardData: CardData) => {
      createNewCard(cardData);
    });
  };
  const handleOnlySelectedClick = (): void => {
    deleteAllCards();
    modifiedTodoCards.forEach((cardData: CardData) => {
      createNewCard(cardData);
    });
  };

  return (
    <div className="inline-block w-52 mr-4">
      <div className="border border-gray rounded-lg absolute">
        <button
          type="button"
          className=" flex justify-between w-52 text-left bg-green p-3 rounded-lg hover:opacity-70"
          onClick={handleDropdownClick}
        >
          Export to Trello
          <span
            className="w-6 h-6 bg-center bg-no-repeat cursor-pointer"
            style={{
              backgroundImage: `url(${arrowDownUrl})`,
              transform: !dropdownState.open ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          ></span>
        </button>
        {dropdownState.open && (
          <div className="">
            <ul>
              <li className="w-52 p-3 rounded-lg hover:bg-lightgreen cursor-pointer">
                <button onClick={handleAllClick}>All</button>
              </li>
              <li className="w-52 p-3 rounded-lg hover:bg-lightgreen cursor-pointer">
                <button onClick={handleOnlySelectedClick}>Only selected</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportDropdown;
