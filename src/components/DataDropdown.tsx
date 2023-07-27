import React, { useState } from 'react';

import arrowDownUrl from '../images/fe_arrow-down.svg';

const DataDropdown = () => {
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });
  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });

  return (
    <div className="inline-block w-52 mr-4">
      <div className="absolute">
        <button
          type="button"
          className=" flex justify-between w-52 text-left bg-gray p-3 rounded-lg mr-4"
          onClick={handleDropdownClick}
        >
          Даты
          <span
            className="w-6 h-6 bg-center bg-no-repeat cursor-pointer"
            style={{
              backgroundImage: 'url(' + arrowDownUrl + ')',
            }}
          ></span>
        </button>
        {dropdownState.open && (
          <div className="dropdown">
            <ul>
              <li className="w-52 bg-gray p-3 rounded-lg">
                <label>
                  Дата начала
                  <input
                    className="w-full rounded"
                    type="date"
                    list="dateList"
                    id="datetimeInput"
                  />
                </label>
              </li>
              <li className="w-52 bg-gray p-3 rounded-lg">
                <label>
                  Дней на разработку
                  <input
                    className="w-full rounded"
                    type="text"
                    list="dateList"
                    id="datetimeInput"
                  />
                </label>
              </li>
              <li className="w-52 bg-gray p-3 rounded-lg">
                <label>
                  Дата завершения
                  <input
                    className="w-full rounded"
                    type="date"
                    list="dateList"
                    id="datetimeInput"
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
