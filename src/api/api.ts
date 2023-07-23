import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosKnownErrorType } from '../types/index';
import { OPENAI_CHAT_URL, OPENAI_KEY } from '../utils/constants';

export const api = axios.create();
export const apiOpenAI = axios.create({
  baseURL: OPENAI_CHAT_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + OPENAI_KEY,
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
