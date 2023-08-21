import { LABEL_ID, TRELLO_KEY } from '../utils/constants';
import { CardData } from '../types/promptTypes';
const apiKey = 'ac6d52cd851e6e0fd687ce36dda30d45';
const redirectUri = 'https://voice-assistant-demo.netlify.app/';
const scope = 'read,write';
const authorizeUrl = `https://trello.com/1/authorize?response_type=code&key=${apiKey}&scope=${scope}&redirect_uri=${redirectUri}`;

type TrelloCard = {
  id: string;
};

function getRandomIdFromArray(ids: string[]): string | null {
  if (ids.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}

const listsId = [
  '64c3ea44d179b00effc7ab34',
  // '64e0cf96ef9138ea9ebc7ff9',
  // '64e0cfad0578a29e4d6f8c94',
  // '64e0cfbc3b4b5b9563950857',
  // '64e0cfc5244814f1bad4d973',
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
export const deleteAllCards = async (): Promise<void> => {
  const getListUrl = `https://api.trello.com/1/lists/${listId}/cards?${TRELLO_KEY}`;
  console.log(getListUrl);

  try {
    const response = await fetch(getListUrl);

    if (!response.ok) {
      throw new Error('Failed to get cards from the list.');
    }

    const cards = await response.json();
    const deleteRequests = cards.map((card: TrelloCard) => {
      const deleteCardUrl = `https://api.trello.com/1/cards/${card.id}?${TRELLO_KEY}`;
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

export const authTrello = () => {
  window.location.href = authorizeUrl;
};
export const createNewBoard = async (token: string) => {
  const createBoardUrl = `https://api.trello.com/1/boards/?name={Название доски из инпута запроса}&key=${apiKey}&token=${token}`;

  console.log('poshlp');

  try {
    const response = await fetch(createBoardUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('доска созданна');
    } else {
      console.error('Error creating board. Server responded with:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error creating board:', error);
    return null;
  }
};
