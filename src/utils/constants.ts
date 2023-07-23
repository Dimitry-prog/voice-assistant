import { RequestOpenAIDataPropsType, RequestOpenAIType } from '../types/promptTypes';

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
      content: `You will be asked a question, and your task is to generate an answer in ${lang}.`,
    },
    {
      role: 'user',
      content: text,
    },
  ],
  temperature: 0.8,
  max_tokens: 500,
});
export const LANGUAGES = {
  'en-US': 'english',
  'ru-RU': 'russian',
};
