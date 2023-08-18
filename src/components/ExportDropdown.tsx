import React, { useState } from 'react';
import { createNewCard, deleteAllCards } from '../api/trelloapi';
import { CardData } from '../types/promptTypes';

import ExportBoardPopup from './ExportBoardPopup';

import arrowDownUrl from '../images/fe_arrow-down.svg';

type TodoCardProps = {
  gptAnswer: CardData[];
  modifiedTodoCards: CardData[];
};

const ExportDropdown = ({ gptAnswer, modifiedTodoCards }: TodoCardProps) => {
  console.log(gptAnswer);

  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });

  const closeInfoTooltip = () => {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  };

  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });
  const handleAllClick = async (): Promise<void> => {
    await deleteAllCards();
    const createdCardPromises = gptAnswer.map(async (cardData: CardData) => {
      return createNewCard(cardData);
    });
    const createdBoardUrls = await Promise.all(createdCardPromises);
    const boardUrl = createdBoardUrls.find((url) => url !== null) as string;

    if (boardUrl !== undefined) {
      setIsInfoTooltip({
        isOpen: true,
        successful: true,
        text: boardUrl,
      });
    } else {
      console.error('Не удалось создать карточки.');
    }
  };
  const handleOnlySelectedClick = async (): Promise<void> => {
    await deleteAllCards();
    const createdCardPromises = modifiedTodoCards.map(async (cardData: CardData) => {
      return createNewCard(cardData);
    });
    const createdBoardUrls = await Promise.all(createdCardPromises);
    const boardUrl = createdBoardUrls.find((url) => url !== null) as string;

    if (boardUrl !== undefined) {
      setIsInfoTooltip({
        isOpen: true,
        successful: true,
        text: boardUrl,
      });
    } else {
      console.error('Не удалось создать карточки.');
    }
  };

  return (
    <>
      <div className="inline-block w-52 mr-4">
        <div className="border border-gray rounded-lg absolute">
          <button
            type="button"
            className="flex justify-between w-52 text-left bg-green p-3 rounded-lg hover:opacity-70"
            onClick={handleDropdownClick}
          >
            Экспорт в Trello
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
                  <button className="w-full text-left" onClick={handleAllClick}>
                    Все
                  </button>
                </li>
                <li className="w-52 p-3 rounded-lg hover:bg-lightgreen cursor-pointer">
                  <button className="w-full text-left" onClick={handleOnlySelectedClick}>
                    Только отмеченные
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <ExportBoardPopup status={isInfoTooltip} onClose={closeInfoTooltip} />
    </>
  );
};

export default ExportDropdown;
