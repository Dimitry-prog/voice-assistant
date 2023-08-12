import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiNotion, handleRequest } from './api';
import { RequestNotionType, ResponseNotionType } from '../types/notionTypes';

export const createNotionCard = createAsyncThunk<
  ResponseNotionType,
  RequestNotionType,
  {
    rejectValue: string;
  }
>('notion/createCard', async (requestData, { rejectWithValue }) => {
  const request = apiNotion.post('/pages', requestData);
  return handleRequest(request, rejectWithValue);
});
