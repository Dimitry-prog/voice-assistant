import { RequestOpenAIDataPropsType, RequestOpenAIType, RoleWithCount } from '../types/promptTypes';
import { v4 as uuidv4 } from 'uuid';

export const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL;
export const OPENAI_CHAT_URL = `${OPENAI_BASE_URL}/chat/completions`;
export const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
export const TRELLO_KEY = import.meta.env.VITE_TRELLO_API_TOKEN;
export const REQUEST_OPENAI_DATA = ({
  lang,
  text,
}: RequestOpenAIDataPropsType): RequestOpenAIType => ({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: `Break down this task in as much detail as possible into subtasks. Return the answer only in the form of a code in this format [{"id": ${uuidv4()}, "parentId": null, "role": "frontend", "start": "start date", "end": "end date", "description": "describe what need to do here", "cardName": "short name for task", },]. And answer return on this language ${lang}`,
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
