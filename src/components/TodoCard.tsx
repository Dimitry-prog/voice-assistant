import React, { useEffect, useState } from 'react';

// import ellipsisUrl from '../images/ri_more-2-fill.svg';
import iconUrl from '../images/card.svg';
import { GPTAnswerType } from '../types/promptTypes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getStructureGPTPrompt } from '../api/promptApi';
import { REQUEST_OPENAI_DATA } from '../utils/constants';
import { formatedDate } from '../utils/formatedDate';

type TodoCardProps = {
  id: string;
  role: string;
  start: string;
  end: string;
  description: string;
  isChecked: boolean;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
  checkboxStates: { [id: string]: boolean };
  prompt: GPTAnswerType;
  prompts: GPTAnswerType[];
  selectedCards: TodoCardProps[];
  setSelectedCards: React.Dispatch<React.SetStateAction<TodoCardProps[]>>;
};

const TodoCard = ({ id, role, start, end, description, prompts }: TodoCardProps) => {
  const [parents, setParents] = useState<GPTAnswerType[]>(prompts);
  const hasChildren: GPTAnswerType[] = parents.filter((child) => child.parentId === id);
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.prompt.lang);
  const gptAnswerStatus = useAppSelector((state) => state.prompt.gptAnswerStatus);
  const gptAnswer = useAppSelector((state) => state.prompt.gptAnswer);

  const [actualIsChecked, setActualIsChecked] = useState(false);

  const handleDecompose = async (
    id: string,
    description: string,
    start: string,
    end: string,
    role: string
  ) => {
    const gptAnswer = await dispatch(
      getStructureGPTPrompt(
        REQUEST_OPENAI_DATA({
          lang,
          text: `System: Please provide a solution to the following task:
          Task: ${description}. Additional conditions for the task: set the time interval from ${start} to ${end} and decide which role can complete this task ${role}`,
        })
      )
    );

    if (typeof gptAnswer.payload === 'object' && 'choices' in gptAnswer.payload) {
      const responsePayload = JSON.parse(gptAnswer.payload.choices[0].message.content);
      console.log(responsePayload);

      if (Array.isArray(responsePayload)) {
        setParents((prevParents) => {
          const newParents: GPTAnswerType[] = responsePayload.map((prompt) => ({
            ...prompt,
            parentId: id,
          }));
          return [...prevParents, ...newParents];
        });
      }
    }
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsChecked = e.target.checked;
    setActualIsChecked(newIsChecked);
  };

  return (
    <li
      className={`flex flex-col justify-between gap-2 border rounded-lg p-3 border-gray ${
        actualIsChecked ? 'bg-lightgreen' : 'bg-white'
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-4"
            checked={actualIsChecked}
            onChange={handleCheckboxChange}
          />
          <span>{description}</span>
        </div>
        <div className="flex items-center">
          <span className="mx-2 bg-violet rounded-lg p-1 whitespace-nowrap max-w-[210px] overflow-hidden">
            <span>{formatedDate(start)} -</span>
            {end !== '' && <span> {formatedDate(end)}</span>}
          </span>
          <span className="mr-2 bg-yellow rounded-lg p-1">{role}</span>
          <button
            onClick={() => handleDecompose(id, description, start, end, role)}
            id="voice"
            type="button"
            aria-label="voice-new-item"
            className="z-10 w-6 h-6 bg-center bg-no-repeat bg-cover cursor-pointer mr-2 hover:opacity-70 disabled:opacity-10 disabled:cursor-default"
            style={{
              backgroundImage: `url(${iconUrl})`,
            }}
            disabled={gptAnswerStatus === 'loading'}
          />
        </div>
      </div>
      {hasChildren.length > 0 && (
        <ul className="ml-8 flex flex-col gap-2">
          {hasChildren.map((child) => (
            <TodoCard
              key={child.id}
              id={child.id}
              role={child.role}
              start={child.start}
              end={child.end}
              description={child.description}
              prompt={child}
              prompts={prompts}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TodoCard;
