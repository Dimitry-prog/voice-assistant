import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGPTPrompt } from '../../api/promptApi';

type PromptStateType = {
  lang: string;
  userPrompt: string;
  gptPrompt: string;
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
};

const initialState: PromptStateType = {
  lang: 'russian',
  userPrompt: '',
  gptPrompt: '',
  status: 'init',
  error: undefined,
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
  },
  extraReducers: (builder: ActionReducerMapBuilder<PromptStateType>) => {
    builder
      .addCase(getGPTPrompt.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(getGPTPrompt.fulfilled, (state, action) => {
        state.status = 'success';
        state.gptPrompt = action.payload.choices[0].message.content;
      })
      .addCase(getGPTPrompt.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { reducer: promptReducer, actions: promptActions } = promptSlice;
