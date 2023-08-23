import React, { useState } from 'react';
import { ListType } from '../types/trelloTypes';
import {
  deleteAllCards,
  createLabel,
  createCards,
  deleteAllLabels,
  getAllList,
} from '../api/trelloapi';
import { CardData } from '../types/promptTypes';
import { removeDuplicateCardsByRole } from '../utils/removeDuplicateCardsByRole';
import ExportBoardPopup from './ExportBoardPopup';

import arrowDownUrl from '../images/fe_arrow-down.svg';
const token = 'ATTA7194362b6f7b0932ece543b8574095151c8cb16379ac42860d2ae2c3e76f597c81048FFF';
const boardIds = [
  '64e0cf96ef9138ea9ebc7ff8',
  '64e0cf96ef9138ea9ebc7ff8',
  '64e0cf96ef9138ea9ebc7ff8',
  '64e0cf96ef9138ea9ebc7ff8',
  '64e0cf96ef9138ea9ebc7ff8',
];
function getRandomIdFromArray(ids: string[]): string | null {
  if (ids.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}

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

  const handleClick = async (cards: CardData[]): Promise<void> => {
    const boardId = getRandomIdFromArray(boardIds);
    if (boardId !== null) {
      await deleteAllLabels(token, boardId);
      const lists = await getAllList(token, boardId);
      const backlogList = lists.find((item: ListType) => item.name === 'Backlog');
      const roles = removeDuplicateCardsByRole(cards);
      const labelId = await createLabel(token, boardId, roles);
      if (backlogList) {
        await deleteAllCards(token, backlogList.id);
        for (const card of cards) {
          await createCards(token, backlogList.id, labelId, card);
        }
      }
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
                  <button className="w-full text-left" onClick={() => handleClick(gptAnswer)}>
                    Все
                  </button>
                </li>
                <li className="w-52 p-3 rounded-lg hover:bg-lightgreen cursor-pointer">
                  <button
                    className="w-full text-left"
                    onClick={() => handleClick(modifiedTodoCards)}
                  >
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
