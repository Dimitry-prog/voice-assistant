import { LABEL_ID, TRELLO_KEY } from '../utils/constants';
import { CardData } from '../types/promptTypes';
import { TrelloCard, LabelsIds, LabelType, ListType } from '../types/trelloTypes';
const API_KEY = 'ac6d52cd851e6e0fd687ce36dda30d45';
// const token = 'ATTA7194362b6f7b0932ece543b8574095151c8cb16379ac42860d2ae2c3e76f597c81048FFF';
const redirectUri = 'http://localhost:5173/';
// const redirectUri = 'https://voice-assistant-demo.netlify.app/';
const scope = 'read,write';
const authorizeUrl = `https://trello.com/1/authorize?response_type=code&key=${API_KEY}&scope=${scope}&redirect_uri=${redirectUri}`;
const LIST_NAMES = ['Done', 'Blocked', 'Review', 'Pending', 'Backlog'];

function getRandomIdFromArray(ids: string[]): string | null {
  if (ids.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}

const listsId = [
  '64c3ea44d179b00effc7ab34',
  '64e0cf96ef9138ea9ebc7ff9',
  '64e0cfad0578a29e4d6f8c94',
  '64e0cfbc3b4b5b9563950857',
  '64e0cfc5244814f1bad4d973',
];

const listId = getRandomIdFromArray(listsId);

export const createNewCard = async (cardData: CardData): Promise<string | null> => {
  const getListUrl = `https://api.trello.com/1/cards?idList=${listId}&${TRELLO_KEY}`;
  console.log(getListUrl);

  const { description: name = 'description', start, end: due, role } = cardData;

  const idLabels = LABEL_ID[role as keyof typeof LABEL_ID];

  const card = {
    name,
    due,
    start,
    idLabels,
  };
  try {
    const response = await fetch(getListUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    if (response.ok) {
      const responseData = await response.json();
      const boardId = responseData.idBoard;

      const boardUrl = `https://trello.com/b/${boardId}`;
      return boardUrl;
    } else {
      console.error('Error creating card. Server responded with:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error creating card:', error);
    return null;
  }
};
export const deleteAllCards = async (token: string, listId: string): Promise<void> => {
  const getListUrl = `https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${token}`;

  try {
    const response = await fetch(getListUrl);

    if (!response.ok) {
      throw new Error('Failed to get cards from the list.');
    }

    const cards = await response.json();
    const deleteRequests = cards.map((card: LabelType) => {
      const deleteCardUrl = `https://api.trello.com/1/cards/${card.id}?key=${API_KEY}&token=${token}`;
      return fetch(deleteCardUrl, {
        method: 'DELETE',
      });
    });

    const deleteResponses = await Promise.all(deleteRequests);
    deleteResponses.forEach((deleteResponse: Response, index) => {
      const card = cards[index];
      if (deleteResponse.ok) {
        console.log(`Card with ID ${card.id} has been deleted.`);
      } else {
        console.error(`Failed to delete card with ID ${card.id}.`);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
export const deleteAllLabels = async (token: string, boardId: string): Promise<void> => {
  const getBoardUrl = `https://api.trello.com/1/boards/${boardId}/labels?key=${API_KEY}&token=${token}`;
  console.log(getBoardUrl);

  try {
    const response = await fetch(getBoardUrl);

    if (!response.ok) {
      throw new Error('Failed to get labels from the board.');
    }

    const labels = await response.json();
    console.log(labels);
    const deleteRequests = labels.map((label: TrelloCard) => {
      const deleteCardUrl = `https://api.trello.com/1/labels/${label.id}?key=${API_KEY}&token=${token}`;
      return fetch(deleteCardUrl, {
        method: 'DELETE',
      });
    });

    const deleteResponses = await Promise.all(deleteRequests);
    deleteResponses.forEach((deleteResponse: Response, index) => {
      const label = labels[index];
      if (deleteResponse.ok) {
        console.log(`label with ID ${label.id} has been deleted.`);
      } else {
        console.error(`Failed to delete label with ID ${label.id}.`);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllList = async (token: string, boardId: string): Promise<ListType[]> => {
  const getBoardUrl = `https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${token}`;
  console.log(getBoardUrl);

  try {
    const response = await fetch(getBoardUrl);

    if (!response.ok) {
      throw new Error('Failed to get lists from the board.');
    }
    const lists = await response.json();
    return lists;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const authTrello = () => {
  window.location.href = authorizeUrl;
};

export const createBoard = async (token: string, BOARD_NAME: string) => {
  const response = await fetch(
    `https://api.trello.com/1/boards/?key=${API_KEY}&token=${token}&name=${BOARD_NAME}&defaultLists=false`,
    { method: 'POST' }
  );
  const boardData = await response.json();
  return boardData.id;
};

export const createLists = async (token: string, boardId: string) => {
  const listIds = [];
  for (const listName of LIST_NAMES) {
    const response = await fetch(
      `https://api.trello.com/1/lists/?key=${API_KEY}&token=${token}&name=${listName}&idBoard=${boardId}`,
      { method: 'POST' }
    );
    const listData = await response.json();
    listIds.push(listData.id);
  }
  return listIds;
};

export const createLabel = async (token: string, boardId: string, roles: string[]) => {
  console.log(roles);
  const labelsIds: Record<string, string> = {};
  const availableColors = [
    'yellow',
    'purple',
    'blue',
    'red',
    'green',
    'orange',
    'black',
    'sky',
    'pink',
    'lime',
  ];
  for (const role of roles) {
    console.log(role);
    const randomColor = availableColors.pop();
    const response = await fetch(
      `https://api.trello.com/1/labels/?key=${API_KEY}&token=${token}&name=${role}&color=${randomColor}&idBoard=${boardId}`,
      { method: 'POST' }
    );
    const labelData = await response.json();
    labelsIds[role] = labelData.id;
  }
  return labelsIds;
};

export const createCards = async (
  token: string,
  listId: string,
  labelsIds: LabelsIds,
  selectedCard: CardData
): Promise<string | null> => {
  const labelId = labelsIds[selectedCard.role as keyof typeof labelsIds];
  console.log(labelId);

  const url = `https://api.trello.com/1/cards/?key=${API_KEY}&token=${token}&idList=${listId}&idLabels=${labelId}`;

  const { description: name = 'description', start, end: due } = selectedCard;

  const card = {
    name,
    due,
    start,
    idLabels: labelId,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });

    if (response.ok) {
      const responseData = await response.json();
      const boardId = responseData.idBoard;
      const boardUrl = `https://trello.com/b/${boardId}`;
      return boardUrl;
    } else {
      console.error('Error creating card. Server responded with:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error creating card:', error);
    return null;
  }
};
