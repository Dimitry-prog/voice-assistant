import React from 'react';
import TodoForm from './TodoForm';
import TodoCards from './TodoCards';
import Filter from './Filter';

const Main = () => {
  return (
    <main className="w-full max-w-7xl flex flex-col p-36">
      <TodoForm />
      <Filter />
      <TodoCards />
    </main>
  );
};

export default Main;
