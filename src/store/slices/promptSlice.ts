import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGPTPrompt, getStructureGPTPrompt } from '../../api/promptApi';
import {
  GPTAnswerType,
  GPTConfigDateType,
  GPTConfigRoleType,
  GPTConfigType,
} from '../../types/promptTypes';

type PromptStateType = {
  lang: string;
  userPrompt: string;
  gptPrompt: GPTAnswerType[];
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
  gptConfig: GPTConfigType;
  gptAnswer: GPTAnswerType[];
  gptAnswerStatus: 'init' | 'loading' | 'success' | 'error';
};

const initialState: PromptStateType = {
  lang: 'english',
  userPrompt: '',
  gptPrompt: [],
  gptAnswer: [],
  status: 'init',
  gptAnswerStatus: 'init',
  error: undefined,
  gptConfig: {
    date: {
      start: new Date().toString(),
      days: '',
      end: '',
    },
    role: {
      frontend: 0,
      backend: 0,
      designer: 0,
      fullstack: 0,
      projectmanager: 0,
      analyst: 0,
      datascientist: 0,
      QAengineer: 0,
    },
  },
};

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setUserPrompt: (state, action: PayloadAction<string>) => {
      state.userPrompt = action.payload;
    },
    setGptDateConfig: (state, action: PayloadAction<GPTConfigDateType>) => {
      state.gptConfig.date = action.payload;
    },
    setGptRoleConfig: (state, action: PayloadAction<GPTConfigRoleType>) => {
      state.gptConfig.role = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PromptStateType>) => {
    builder
      .addCase(getGPTPrompt.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
        state.gptAnswer = [];
      })
      .addCase(getGPTPrompt.fulfilled, (state, action) => {
        state.status = 'success';
        state.gptPrompt = JSON.parse(action.payload.choices[0].message.content);
      })
      .addCase(getGPTPrompt.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(getStructureGPTPrompt.pending, (state) => {
        state.gptAnswerStatus = 'loading';
        state.error = undefined;
      })
      .addCase(getStructureGPTPrompt.fulfilled, (state, action) => {
        state.gptAnswerStatus = 'success';
        state.gptAnswer = JSON.parse(action.payload.choices[0].message.content);
      })
      .addCase(getStructureGPTPrompt.rejected, (state, action) => {
        state.gptAnswerStatus = 'error';
        state.error = action.payload;
      });
  },
});

export const { reducer: promptReducer, actions: promptActions } = promptSlice;
