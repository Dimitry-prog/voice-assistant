import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import useRecordVoice from '../hooks/useRecordVoice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { promptActions } from '../store/slices/promptSlice';
import { LANGUAGES, REQUEST_OPENAI_DATA } from '../utils/constants';
import { getGPTPrompt } from '../api/promptApi';

import microUrl from '../images/micro-svg.svg';
import microActiveUrl from '../images/micro-active.svg';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const [lang, setLang] = useState<string>('');
  const [text, setText] = useState<string>('');
  const { recordedText, isRecording, handleStartRecordVoice } = useRecordVoice({
    lang: LANGUAGES[lang as keyof typeof LANGUAGES],
  });
  const gptConfig = useAppSelector((state) => state.prompt.gptConfig);
  let gptPromptDate = Object.entries(gptConfig.date)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
  let gptPromptRole = Object.entries(gptConfig.role)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
    dispatch(promptActions.setLang(event.target.value));
  };

  if (gptConfig.date.end === '') {
    gptPromptDate += 'decide for yourself';
  }
  if (
    gptConfig.role.frontend === 0 &&
    gptConfig.role.backend === 0 &&
    gptConfig.role.designer === 0
  ) {
    gptPromptRole = 'decide for yourself which specialists are needed';
  }

  const returnAnswer = ` .additional conditions to the task: For each task, specify the predicted time. set the time ${gptPromptDate} interval needed to solve the task, split roles(role: '') : ${gptPromptRole}.`;

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setText(newValue);
  };

  useEffect(() => {
    setText(recordedText);
  }, [recordedText]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      getGPTPrompt(
        REQUEST_OPENAI_DATA({
          lang,
          text: 'Task:' + text + returnAnswer,
        })
      )
    );
  };

  return (
    <form className="flex" name="todo-form" onSubmit={handleSubmit}>
      <div className="flex w-full rounded-lg border border-gray p-4 mr-2">
        <input
          required
          autoComplete="off"
          id="todo-item"
          type="text"
          className="outline-none w-full h-full z-0 pr-8"
          placeholder="Можете сказать голосом или написать ваш запрос. Что вы хотите сделать ?"
          value={text}
          onChange={handleChangeInput}
        />
        <select className="w-12 mr-2" onChange={handleChangeSelect}>
          <option value="" disabled={true}>
            Выбери язык
          </option>
          <option value="english">En</option>
          <option value="russian">Ru</option>
        </select>
        <button
          onClick={handleStartRecordVoice}
          id="voice"
          type="button"
          aria-label="voice-new-item"
          className="z-10 w-6 h-6 cursor-pointer"
        >
          <img
            className="hover:opacity-70"
            src={!isRecording ? microUrl : microActiveUrl}
            alt="Микрофон"
          />
        </button>
      </div>
      <button
        id="add-item"
        aria-label="add-new-item"
        className="w-20 h-auto bg-green rounded-lg flex-shrink-0 hover:opacity-70"
        type="submit"
      >
        Начать
      </button>
    </form>
  );
};

export default TodoForm;
