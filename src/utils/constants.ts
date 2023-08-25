import { RequestOpenAIDataPropsType, RequestOpenAIType } from '../types/promptTypes';

import { NotionCardType } from '../types/notionTypes';

export const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL;
export const OPENAI_CHAT_URL = `${OPENAI_BASE_URL}/chat/completions`;
export const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
export const TRELLO_KEY = import.meta.env.VITE_TRELLO_API_TOKEN;
export const REQUEST_OPENAI_DATA = ({
  lang,
  text,
}: RequestOpenAIDataPropsType): RequestOpenAIType => ({
  model: 'gpt-3.5-turbo-16k',
  messages: [
    {
      role: 'system',
      content: `${text}. Keep in mind that tasks can be executed in parallel. Break down this task into subtasks as detailed as possible. There should always be more than one subtasks and they should be different from the original task. Provide the answer only in the form of a code using this format: [{"role": "frontend" , "start": "start date", "end": "end date", "description": "describe what needs to be done here in ${lang}"}, ...other subtasks].There should always be more than one subtasks.`,
    },
    {
      role: 'user',
      content: ``,
    },
  ],
  temperature: 0,
  max_tokens: 2480,
});
export const LANGUAGES = {
  english: 'en-US',
  russian: 'ru-RU',
};

export const roles = [
  { roleRu: 'Дизайнер', roleEn: 'designer', count: 0 },
  { roleRu: 'Фронтендер', roleEn: 'frontend', count: 0 },
  { roleRu: 'Бэкендер', roleEn: 'backend', count: 0 },
  { roleRu: 'Менеджер проекта', roleEn: 'projectmanager', count: 0 },
  { roleRu: 'Фулстек', roleEn: 'fullstack', count: 0 },
  { roleRu: 'Аналитик', roleEn: 'analyst', count: 0 },
  { roleRu: 'Датасаентист', roleEn: 'datascientist', count: 0 },
  { roleRu: 'QA-тестировщик', roleEn: 'QAengineer', count: 0 },
];
export const BOARD_IDS = [
  '64e0cf96ef9138ea9ebc7ff8',
  '64c3ea2d70990d681cefacac',
  '64e0cfad0578a29e4d6f8c93',
  '64e0cfbc3b4b5b9563950856',
  '64e0cfc5244814f1bad4d972',
  '64e0cfcf2c7630920e562b46',
  '64e88e1ca79cd70ac328cf83',
  '64e88e2462bf1b59ab1afa49',
  '64e88e2c62ab7b0e4d14263e',
];

export const LIST_NAMES = ['Done', 'Blocked', 'Review', 'Pending', 'Backlog'];

export const TRELLO_LABEL_COLORS = [
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
export const NOTION_KEY = import.meta.env.VITE_NOTION_API_TOKEN;
export const NOTION_BASE_URL = import.meta.env.VITE_NOTION_BASE_URL;
export const REQUEST_NOTION_CARD_DATA = (data: NotionCardType) => ({
  parent: {
    type: 'database_id',
    database_id: import.meta.env.VITE_NOTION_DESK_ID,
  },
  properties: {
    Role: {
      id: 'LOQ%3F',
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: {
            content: data.role,
            link: null,
          },
          annotations: {
            bold: true,
            italic: false,
            strikethrough: false,
            underline: false,
            code: true,
            color: 'default',
          },
          plain_text: 'Front',
          href: null,
        },
      ],
    },
    Name: {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: data.title,
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'This is also not done',
          href: null,
        },
      ],
    },
    Date: {
      id: 'M%3BBw',
      type: 'date',
      date: {
        start: data.date.start,
        end: data.date.end,
        time_zone: null,
      },
    },
  },
});
