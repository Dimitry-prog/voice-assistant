import { RequestOpenAIDataPropsType, RequestOpenAIType, RoleWithCount } from '../types/promptTypes';

export const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL;
export const OPENAI_CHAT_URL = `${OPENAI_BASE_URL}/chat/completions`;
export const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
export const REQUEST_OPENAI_DATA = ({
  lang,
  text,
}: RequestOpenAIDataPropsType): RequestOpenAIType => ({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: `Break this task into several more detailed tasks. Return the answer only in the form of a code in this format [{"id": "", "role": "frontend", "start": "start date", "end": "end date", "description": "describe what need to do here", "cardName": "short name for task", },]. And answer return on this language ${lang}`,
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
export const rolesWithCounts: RoleWithCount[] = [
  { role: 'Дизайнер', count: 0 },
  { role: 'Фронтендер', count: 0 },
  { role: 'Бэкендер', count: 0 },
];

export const roles = [
  { roleRu: 'Дизайнер', roleEn: 'designer', count: 0 },
  { roleRu: 'Фронтендер', roleEn: 'frontend', count: 0 },
  { roleRu: 'Бэкендер', roleEn: 'backend', count: 0 },
];
