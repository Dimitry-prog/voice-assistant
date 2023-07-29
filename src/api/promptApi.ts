import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestOpenAIType, ResponseOpenAIType } from '../types/promptTypes';
import { apiOpenAI, handleRequest } from './api';

export const getGPTPrompt = createAsyncThunk<
  ResponseOpenAIType,
  RequestOpenAIType,
  {
    rejectValue: string;
  }
>('prompt/getGPTPrompt', async (requestData, { rejectWithValue }) => {
  const request = apiOpenAI.post('', requestData);
  return handleRequest(request, rejectWithValue);
});

export const getStructureGPTPrompt = createAsyncThunk<
  ResponseOpenAIType,
  RequestOpenAIType,
  {
    rejectValue: string;
  }
>('prompt/getStructureGPTPrompt', async (requestData, { rejectWithValue }) => {
  const request = apiOpenAI.post('', requestData);
  return handleRequest(request, rejectWithValue);
});
