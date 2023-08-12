import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosKnownErrorType } from '../types/index';
import { NOTION_BASE_URL, NOTION_KEY, OPENAI_CHAT_URL, OPENAI_KEY } from '../utils/constants';

export const api = axios.create();
export const apiOpenAI = axios.create({
  baseURL: OPENAI_CHAT_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + OPENAI_KEY,
  },
});

export const apiNotion = axios.create({
  baseURL: NOTION_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + NOTION_KEY,
    'Notion-Version': '2022-06-28',
  },
});

export const handleRequest = async (
  reqFun: Promise<AxiosResponse>,
  reject: (value: string) => string | unknown
) => {
  try {
    const { data } = await reqFun;
    return data;
  } catch (e) {
    const error = e as AxiosError<AxiosKnownErrorType>;
    const errorMessage: string = error.response?.data.message || String(error);
    return reject(errorMessage);
  }
};
