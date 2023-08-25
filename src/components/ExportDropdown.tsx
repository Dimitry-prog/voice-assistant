import React, { useState } from 'react';
import { ListType } from '../types/trelloTypes';
import {
  deleteAllCards,
  createLabels,
  createCard,
  deleteAllLabels,
  getAllLists,
} from '../api/trelloapi';
import { CardData } from '../types/promptTypes';
import { removeDuplicateCardsByRole } from '../utils/removeDuplicateCardsByRole';
import ExportBoardPopup from './ExportBoardPopup';

import { BOARD_IDS } from '../utils/constants';
import arrowDownUrl from '../images/fe_arrow-down.svg';
const token = 'ATTA7194362b6f7b0932ece543b8574095151c8cb16379ac42860d2ae2c3e76f597c81048FFF';

function getRandomIdFromArray(ids: string[]): string | null {
  if (ids.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}

type TodoCardProps = {
  allCards: CardData[];
  selectedCards: CardData[];
  prompts: CardData[];
};

const ExportDropdown = ({ allCards, selectedCards, prompts }: TodoCardProps) => {
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: '',
    link: '',
  });
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });

  const closeInfoTooltip = () => {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  };

  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });

  const handleClick = async (cards: CardData[]): Promise<void> => {
    setIsInfoTooltip({
      isOpen: true,
      successful: true,
      text: `Загрузка`,
      link: '',
    });
    const boardId = getRandomIdFromArray(BOARD_IDS);
    if (boardId !== null) {
      try {
        await processBoard(token, boardId, cards);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: `Ссылка на доску`,
          link: `https://trello.com/b/${boardId}`,
        });
      }
    }
  };

  const processBoard = async (token: string, boardId: string, cards: CardData[]): Promise<void> => {
    await deleteAllLabels(token, boardId);
    const backlogList = await getBacklogList(token, boardId);
    const roles = removeDuplicateCardsByRole(cards);
    const labelId = await createLabels(token, boardId, roles);
    if (backlogList) {
      await updateBacklogList(token, backlogList.id, labelId, cards);
    }
  };

  const getBacklogList = async (token: string, boardId: string): Promise<ListType | undefined> => {
    const lists = await getAllLists(token, boardId);
    return lists.find((item: ListType) => item.name === 'Backlog');
  };

  const updateBacklogList = async (
    token: string,
    listId: string,
    labelId: Record<string, string> = {},
    cards: CardData[]
  ): Promise<void> => {
    await deleteAllCards(token, listId);
    const createCardPromises = cards.map((card) => createCard(token, listId, labelId, card));
    await Promise.all(createCardPromises);
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
                  <button
                    className="w-full text-left"
                    onClick={() => handleClick(allCards.length ? allCards : prompts)}
                  >
                    Все
                  </button>
                </li>
                <li className="w-52 p-3 rounded-lg hover:bg-lightgreen cursor-pointer">
                  <button className="w-full text-left" onClick={() => handleClick(selectedCards)}>
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
