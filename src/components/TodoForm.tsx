import React from 'react';
import Filter from './Filter';
const imgUrl = new URL('../images/micro-svg.svg', import.meta.url);

const TodoForm = () => {
  return (
    <div className="p-36">
      <form className="flex " name="todo-form">
        <div className="flex w-full rounded-lg border border-black border-solid p-4 mr-2">
          <input
            required
            autoComplete="off"
            id="todo-item"
            type="text"
            className="outline-none w-full h-full z-0"
            placeholder="new project"
          />
          <button
            id="voice"
            type="button"
            aria-label="voice-new-item"
            className="z-10 w-6 h-6 bg-center bg-no-repeat cursor-pointer relative"
            style={{
              backgroundImage: 'url(' + imgUrl + ')',
            }}
          />
        </div>
        <button
          id="add-item"
          aria-label="add-new-item"
          className=" w-16 h-auto bg-green rounded-lg flex-shrink-0"
        >
          Start
        </button>
      </form>
      <Filter />
    </div>
  );
};

export default TodoForm;
