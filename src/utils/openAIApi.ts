import { apiUrl } from './constants';
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
interface IRequestData {
  model: string;
  messages: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
  temperature: number;
  max_tokens: number;
}

export const generateChatCompletion = async (requestData: IRequestData) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + apiKey,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при запросе к GPT-3.5:', error);
  }
};
