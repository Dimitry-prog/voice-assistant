import React, { ChangeEvent, useEffect, useState } from 'react';

import arrowDownUrl from '../images/fe_arrow-down.svg';
import { GPTConfigDateType } from '../types/promptTypes';
import { useAppDispatch } from '../hooks/reduxHooks';
import { promptActions } from '../store/slices/promptSlice';

const DataDropdown = () => {
  const dispatch = useAppDispatch();
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });

  const [dateValues, setDateValues] = useState<GPTConfigDateType>({
    start: new Date().toString(),
    end: '',
    days: '',
  });

  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateValues({ ...dateValues, [name]: value });
  };

  useEffect(() => {
    dispatch(promptActions.setGptDateConfig(dateValues));
  }, [dateValues]);

  return (
    <div className="inline-block w-72 mr-4">
      <div className="border border-gray rounded-lg absolute bg-white">
        <button
          type="button"
          className=" flex justify-between w-72 text-lef p-3 rounded-lg hover:opacity-70"
          onClick={handleDropdownClick}
        >
          Сроки
          <span
            className="w-6 h-6 bg-center bg-no-repeat cursor-pointer"
            style={{
              backgroundImage: `url(${arrowDownUrl})`,
              transform: !dropdownState.open ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          ></span>
        </button>
        {dropdownState.open && (
          <div className="text-sm">
            <ul>
              <li className=" w-72 px-3 pb-3 rounded-lg">
                <label>
                  Дата начала
                  <input
                    value={dateValues.start}
                    onChange={handleChange}
                    className="w-full rounded px-3 py-1 border border-gray"
                    type="date"
                    list="dateList"
                    id="datetimeInput"
                    name="start"
                  />
                </label>
              </li>
              <li className=" w-72 px-3 pb-3 rounded-lg">
                <label>
                  Дней на разработку
                  <input
                    value={dateValues.days}
                    onChange={handleChange}
                    className="w-full rounded px-3 py-1 border border-gray"
                    type="text"
                    list="dateList"
                    id="datetimeInput"
                    name="days"
                  />
                </label>
              </li>
              <li className="w-72 px-3 pb-3 rounded-lg">
                <label>
                  Дата завершения
                  <input
                    value={dateValues.end}
                    onChange={handleChange}
                    className="w-full rounded px-3 py-1 border border-gray"
                    type="date"
                    list="dateList"
                    id="datetimeInput"
                    name="end"
                  />
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDropdown;
