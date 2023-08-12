import { RequestOpenAIDataPropsType, RequestOpenAIType } from '../types/promptTypes';
import { v4 as uuidv4 } from 'uuid';
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
      content: `${text},keep in mind that tasks can be executed in parallel, Break down this task in as much detail as possible into subtasks.Return the answer only in the form of a code in this format [{"id": ${uuidv4()}, "parentId": null, "role": "frontend", "start": "start date", "end": "end date", "description": "describe what need to do here", "cardName": "short name for task", },]. And answer return on this language ${lang}`,
    },
    {
      role: 'user',
      content: text,
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
  { roleRu: 'Менеджер проекта', roleEn: 'projectmanager', count: 0 },
  { roleRu: 'Фулстек', roleEn: 'fullstack', count: 0 },
  { roleRu: 'Аналитик', roleEn: 'analyst', count: 0 },
  { roleRu: 'Датасаентист', roleEn: 'datascientist', count: 0 },
  { roleRu: 'QA-тестировщик', roleEn: 'QAengineer', count: 0 },
];

export const LABEL_ID = {
  frontend: '64c3ea2d53ef33a7bd91e5bf',
  backend: '64c3ea2d53ef33a7bd91e5c8',
  designer: '64c3ea2d53ef33a7bd91e5c2',
  fullstack: '64c3ea2d53ef33a7bd91e5cb',
  projectmanager: '64c3ea2d53ef33a7bd91e5d2',
  analyst: '64c3ea2d53ef33a7bd91e5cc',
  datascientist: '64c69f6692144f4c019648cf',
  QAengineer: '64c69f6d375c78887872ae36',
};
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
