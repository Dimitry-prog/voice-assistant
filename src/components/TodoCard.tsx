import React from 'react';

// import ellipsisUrl from '../images/ri_more-2-fill.svg';
import iconUrl from '../images/card.svg';

type TodoCardProps = {
  id: string;
  role: string;
  start: string;
  end: string;
  description: string;
  cardName: string;
  isChecked: boolean;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
};

const TodoCard = ({
  id,
  role,
  start,
  end,
  description,
  cardName,
  isChecked,
  onCheckboxChange,
}: TodoCardProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(id, e.target.checked);
  };

  return (
    <li className="flex justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mx-2"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span>{description}</span>
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
            backgroundImage: `url(${iconUrl})`,
          }}
        />
        {/* <button
          id="voice"
          type="button"
          aria-label="voice-new-item"
          className="z-10 w-7 h-7 bg-center bg-no-repeat bg-cover cursor-pointer mr-2"
          style={{
            backgroundImage: `url(${ellipsisUrl})`,
          }}
        /> */}
      </div>
    </li>
  );
};

export default TodoCard;
