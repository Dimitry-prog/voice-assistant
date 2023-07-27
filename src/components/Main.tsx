import React from 'react';
import TodoForm from './TodoForm';
import TodoCards from './TodoCards';
import Filter from './Filter';
import { useAppSelector } from '../hooks/reduxHooks';

const Main = () => {
  const gptPrompt = useAppSelector((state) => state.prompt.gptPrompt);

  return (
    <main className="w-full max-w-7xl flex flex-col p-36">
      <TodoForm />
      <Filter />
      {gptPrompt && <div className="my-10 text-2xl dark:text-white/90">{gptPrompt}</div>}
      <TodoCards />
    </main>
  );
};

export default Main;
