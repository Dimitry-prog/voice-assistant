import { CardData } from '../types/promptTypes';
import { TrelloCard, LabelsIds, LabelType, ListType } from '../types/trelloTypes';
import { LIST_NAMES, TRELLO_LABEL_COLORS } from '../utils/constants';

const API_KEY = 'ac6d52cd851e6e0fd687ce36dda30d45';

// const redirectUri = 'http://localhost:5173/';
const redirectUri = 'https://voice-assistant-demo.netlify.app/';
const scope = 'read,write';
const authorizeUrl = `https://trello.com/1/authorize?response_type=code&key=${API_KEY}&scope=${scope}&redirect_uri=${redirectUri}`;

const getCardsFromList = async (token: string, listId: string) => {
  const getListUrl = `https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${token}`;

  try {
    const response = await fetch(getListUrl);
    if (!response.ok) {
      throw new Error('Failed to get cards from the list.');
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteCard = async (token: string, cardId: string) => {
  const deleteCardUrl = `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${token}`;
  try {
    const response = await fetch(deleteCardUrl, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error(`Failed to delete card with ID ${cardId}.`);
  }
};

export const deleteAllCards = async (token: string, listId: string) => {
  try {
    const cards = await getCardsFromList(token, listId);
    const deletePromises = cards.map((card: TrelloCard) => deleteCard(token, card.id));
    const deleteResults = await Promise.all(deletePromises);

    deleteResults.forEach((success, index) => {
      const card = cards[index];
      if (success) {
        console.log(`Card with ID ${card.id} has been deleted.`);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const getLabelsFromBoard = async (token: string, boardId: string): Promise<LabelType[]> => {
  const getBoardUrl = `https://api.trello.com/1/boards/${boardId}/labels?key=${API_KEY}&token=${token}`;

  const response = await fetch(getBoardUrl);
  if (!response.ok) {
    throw new Error('Failed to get labels from the board.');
  }

  const labels = await response.json();
  return labels;
};

const deleteLabel = async (token: string, labelId: string): Promise<void> => {
  const deleteLabelUrl = `https://api.trello.com/1/labels/${labelId}?key=${API_KEY}&token=${token}`;

  try {
    const deleteResponse = await fetch(deleteLabelUrl, {
      method: 'DELETE',
    });

    if (deleteResponse.ok) {
      console.log(`Label with ID ${labelId} has been deleted.`);
    } else {
      console.error(`Failed to delete label with ID ${labelId}.`);
    }
  } catch (error) {
    console.error(`An error occurred while deleting label with ID ${labelId}:`, error);
  }
};

export const deleteAllLabels = async (token: string, boardId: string): Promise<void> => {
  try {
    const labels = await getLabelsFromBoard(token, boardId);
    console.log(labels);

    const deletePromises = labels.map((label: LabelType) => deleteLabel(token, label.id));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error(error);
  }
};

export const getAllLists = async (token: string, boardId: string): Promise<ListType[]> => {
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
  try {
    const response = await fetch(
      `https://api.trello.com/1/boards/?key=${API_KEY}&token=${token}&name=${BOARD_NAME}&defaultLists=false`,
      { method: 'POST' }
    );

    if (!response.ok) {
      throw new Error('Failed to create board');
    }

    const boardData = await response.json();
    return boardData.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createList = async (token: string, boardId: string, listName: string) => {
  console.log(listName);

  const url = `https://api.trello.com/1/lists/?key=${API_KEY}&token=${token}&name=${listName}&idBoard=${boardId}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
    });
    const listData = await response.json();
    return listData.id;
  } catch (error) {
    console.error(`Error creating list ${listName}:`, error);
    throw error;
  }
};

export const createLists = async (token: string, boardId: string) => {
  try {
    const listIds = [];

    for (const listName of LIST_NAMES) {
      const listId = await createList(token, boardId, listName);
      listIds.push(listId);
    }

    return listIds;
  } catch (error) {
    console.error('Error creating lists:', error);
    throw error;
  }
};
export const createLabels = async (token: string, boardId: string, roles: string[]) => {
  const labelsIds: Record<string, string> = {};

  const labelPromises = roles.map(async (role) => {
    try {
      const randomColor = TRELLO_LABEL_COLORS.pop();
      const url = `https://api.trello.com/1/labels/?key=${API_KEY}&token=${token}&name=${role}&color=${randomColor}&idBoard=${boardId}`;
      const response = await fetch(url, { method: 'POST' });
      const labelData = await response.json();
      labelsIds[role] = labelData.id;
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.allSettled(labelPromises);

  return labelsIds;
};

export const createCard = async (
  token: string,
  listId: string,
  labelsIds: LabelsIds,
  selectedCard: CardData
) => {
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
  console.log(card);

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
  } catch (error) {
    console.error(error);
  }
};
