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
  cardName: string;
  isChecked: boolean;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
  prompt: GPTAnswerType;
  prompts: GPTAnswerType[];
  gptAnswer: GPTAnswerType[];
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
  prompt,
  prompts,
}: TodoCardProps) => {
  const [parents, setParents] = useState<GPTAnswerType[]>(prompts);
  const hasChildren: GPTAnswerType[] = parents.filter((child) => child.parentId === id);
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.prompt.lang);
  const gptAnswerStatus = useAppSelector((state) => state.prompt.gptAnswerStatus);
  const gptAnswer = useAppSelector((state) => state.prompt.gptAnswer);
  const handleDecompose = async (id: string, description: string, start: string, role: string) => {
    await dispatch(
      getStructureGPTPrompt(
        REQUEST_OPENAI_DATA({
          lang,
          text:
            'Task:' +
            description +
            ` .additional conditions to the task: set the time ${start} interval needed to solve the task and decide which role can complete this task ${role}.`,
        })
      )
    );
    const parents: GPTAnswerType[] = gptAnswer.map((prompt) => ({
      ...prompt,
      parentId: id,
    }));
    setParents((prev) => [...prev, ...parents]);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(id, e.target.checked);
  };

  useEffect(() => {}, [gptAnswer, parents]);

  return (
    <li
      className={`flex flex-col justify-between gap-2 border rounded-lg p-3 border-gray ${
        isChecked && 'bg-lightgreen'
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-4"
            checked={isChecked}
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
            onClick={() => handleDecompose(id, description, start, role)}
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
              id={child.id}
              role={child.role}
              start={child.start}
              end={child.end}
              description={child.description}
              cardName={child.cardName}
              isChecked={isChecked}
              onCheckboxChange={onCheckboxChange}
              prompt={child}
              prompts={prompts}
              gptAnswer={gptAnswer}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TodoCard;
