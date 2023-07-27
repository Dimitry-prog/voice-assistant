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
      content: `Разбей данную задачу на несколько более подробных задач.`,
    },
    {
      role: 'user',
      content:
        text +
        `В команде есть два фронтенд разработчика и два дизайнера. Нужен структурированный ответ с указанием приблизительного времени выполнения каждой задачи.`,
    },
  ],
  temperature: 0.8,
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
