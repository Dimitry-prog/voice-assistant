import React from 'react';

const ellipsisUrl = new URL('../images/ri_more-2-fill.svg', import.meta.url);
const iconUrl = new URL('../images/card.svg', import.meta.url);

type TodoCardProps = {
  id: string;
  role: string;
  start: string;
  end: string;
  description: string;
  cardName: string;
};

const TodoCard = ({ id, role, start, end, description, cardName }: TodoCardProps) => {
  return (
    <li className="flex justify-between">
      <div className="flex items-center">
        <input type="checkbox" className="mx-2" />
        <span>{cardName}</span>
      </div>
      <div className="flex items-center">
        <span className="mr-2 bg-violet">
          <span>{start} -</span>
          <span> {end}</span>
        </span>
        <span className="mr-2 bg-yellow">{role}</span>
        <button
          id="voice"
          type="button"
          aria-label="voice-new-item"
          className="z-10 w-6 h-6 bg-center bg-no-repeat bg-cover cursor-pointer mr-2"
          style={{
            backgroundImage: 'url(' + iconUrl + ')',
          }}
        />
        <button
          id="voice"
          type="button"
          aria-label="voice-new-item"
          className="z-10 w-7 h-7 bg-center bg-no-repeat bg-cover cursor-pointer mr-2"
          style={{
            backgroundImage: 'url(' + ellipsisUrl + ')',
          }}
        />
      </div>
    </li>
  );
};

export default TodoCard;
