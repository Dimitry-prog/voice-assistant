import { TRELLO_KEY } from '../utils/constants';

type CardData = {
  role: string;
  start: string;
  end: string;
  description: string;
  cardName: string;
};
type TrelloCard = {
  id: string;
};
const labelId = {
  frontend: '64c3ea2d53ef33a7bd91e5bf',
  backend: '64c3ea2d53ef33a7bd91e5c8',
  designer: '64c3ea2d53ef33a7bd91e5c2',
  fullstack: '64c3ea2d53ef33a7bd91e5cb',
  projectmanager: '64c3ea2d53ef33a7bd91e5d2',
  analyst: '64c3ea2d53ef33a7bd91e5cc',
  datascientist: '64c69f6692144f4c019648cf',
  QAengineer: '64c69f6d375c78887872ae36',
};

const listId = '64c3ea44d179b00effc7ab34';

export const createNewCard = async (cardData: CardData): Promise<void> => {
  console.log('отправка запроса');

  const { description: name = 'description', start, end: due, role } = cardData;

  const idLabels = labelId[role as keyof typeof labelId];

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

    console.log(`Response: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error('Error creating card:', error);
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
