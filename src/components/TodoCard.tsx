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
  checkboxStates: { [id: string]: boolean };
  prompt: GPTAnswerType;
  prompts: GPTAnswerType[];
  selectedCards: TodoCardProps[];
  setSelectedCards: React.Dispatch<React.SetStateAction<string[]>>;
};

const TodoCard = ({
  id,
  role,
  start,
  end,
  description,
  cardName,
  // isChecked,
  onCheckboxChange,
  prompt,
  prompts,
  checkboxStates, // Include checkboxStates in the props
  selectedCards,
  setSelectedCards,
}: TodoCardProps) => {
  const [parents, setParents] = useState<GPTAnswerType[]>(prompts);
  const hasChildren: GPTAnswerType[] = parents.filter((child) => child.parentId === id);
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.prompt.lang);
  const gptAnswerStatus = useAppSelector((state) => state.prompt.gptAnswerStatus);
  const gptAnswer = useAppSelector((state) => state.prompt.gptAnswer);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleDecompose = async (id: string, description: string, start: string, role: string) => {
    console.log(id, description, start, role);

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

    setParents((prevParents) => {
      const newParents: GPTAnswerType[] = gptAnswer.map((prompt) => ({
        ...prompt,
        parentId: id,
      }));
      return [...prevParents, ...newParents];
    });
  };
  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   onCheckboxChange(id, e.target.checked);
  // };
  // console.log(parents);

  // console.log(hasChildren);
  const actualIsChecked = checkboxStates.hasOwnProperty(id) ? checkboxStates[id] : false;

  useEffect(() => {}, [gptAnswer, parents]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(id, e.target.checked);
  };
  useEffect(() => {
    // If the checkbox state has changed, update the parent's checkbox state accordingly
    if (actualIsChecked !== checkboxStates[id]) {
      onCheckboxChange(id, actualIsChecked);
    }
  }, [actualIsChecked, checkboxStates, id, onCheckboxChange]);

  useEffect(() => {
    // If the parent's checkbox state has changed, update the local state accordingly
    if (actualIsChecked !== checkboxStates[id]) {
      setIsChecked(checkboxStates[id]);
    }
  }, [actualIsChecked, checkboxStates, id]);

  useEffect(() => {
    // Update selectedCards when the checkbox is checked/unchecked
    if (actualIsChecked) {
      setSelectedCards((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedCards((prevSelected) => prevSelected.filter((item) => item !== id));
    }
  }, [actualIsChecked, setSelectedCards, id]);

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
              key={child.id}
              id={child.id}
              role={child.role}
              start={child.start}
              end={child.end}
              description={child.description}
              cardName={child.cardName}
              isChecked={actualIsChecked}
              onCheckboxChange={onCheckboxChange}
              prompt={child}
              prompts={prompts}
              checkboxStates={checkboxStates}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TodoCard;
