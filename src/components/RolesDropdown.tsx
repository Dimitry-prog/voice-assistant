import React, { useState } from 'react';

import { rolesWithCounts } from '../utils/constants';

import arrowDownUrl from '../images/fe_arrow-down.svg';
import minusUrl from '../images/ei_minus.svg';
import plusUrl from '../images/ei_plus.svg';

const Dropdown = () => {
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });

  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });

  const handleRoleClickMin = (index: number) => {
    const updatedRoles = [...rolesWithCounts];
    updatedRoles[index].count = Math.max(0, updatedRoles[index].count - 1); //новый массив с роляти и count
    console.log(updatedRoles);
    setDropdownState({ open: true }); //тригерит ререндер
  };

  const handleRoleClickMax = (index: number) => {
    const updatedRoles = [...rolesWithCounts];
    updatedRoles[index].count = updatedRoles[index].count + 1;
    console.log(updatedRoles);
    setDropdownState({ open: true }); //тригерит ререндер
  };

  return (
    <div className="inline-block w-52 mr-4">
      <div className="absolute">
        <button
          type="button"
          className=" flex justify-between w-52 text-left bg-gray p-3 rounded-lg mr-4"
          onClick={handleDropdownClick}
        >
          Роли
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
              {rolesWithCounts.map((roleObj, i) => (
                <li className="flex justify-between w-52 bg-gray p-3 rounded-lg" key={i}>
                  <span>{roleObj.role}</span>
                  <div className="flex align-middle">
                    <button className="mr-2" onClick={() => handleRoleClickMin(i)}>
                      <img src={minusUrl} alt="Минус" />
                    </button>
                    <span>{roleObj.count}</span>
                    <button className="ml-2" onClick={() => handleRoleClickMax(i)}>
                      <img src={plusUrl} alt="Плюс" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
