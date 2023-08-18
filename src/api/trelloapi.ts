import { LABEL_ID, TRELLO_KEY } from '../utils/constants';
import { CardData } from '../types/promptTypes';

type TrelloCard = {
  id: string;
};

const listId = '64c3ea44d179b00effc7ab34';

export const createNewCard = async (cardData: CardData): Promise<string | null> => {
  const { description: name = 'description', start, end: due, role } = cardData;

  const idLabels = LABEL_ID[role as keyof typeof LABEL_ID];

  const card = {
    name,
    due,
    start,
    idLabels,
  };
  try {
    const response = await fetch(`https://api.trello.com/1/cards?idList=${listId}&${TRELLO_KEY}`, {
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
