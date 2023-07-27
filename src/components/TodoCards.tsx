import React from 'react';
import TodoCard from './TodoCard';
import ExportDropdown from './ExportDropdown';

const TodoCards = () => {
  return (
    <>
      <div className="mb-2 min-h-[450px] border">
        <ul>
          <TodoCard />
          <TodoCard />
          <TodoCard />
          <TodoCard />
          <TodoCard />
          <TodoCard />
        </ul>
      </div>
      <ExportDropdown />
    </>
  );
};

export default TodoCards;
