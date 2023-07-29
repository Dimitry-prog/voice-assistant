import React, { useEffect, useState } from 'react';

import { roles } from '../utils/constants';

import arrowDownUrl from '../images/fe_arrow-down.svg';
import minusUrl from '../images/ei_minus.svg';
import plusUrl from '../images/ei_plus.svg';
import { GPTConfigRoleType } from '../types/promptTypes';
import { promptActions } from '../store/slices/promptSlice';
import { useAppDispatch } from '../hooks/reduxHooks';

const Dropdown = () => {
  const dispatch = useAppDispatch();
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });
  const [roleValues, setRoleValues] = useState<GPTConfigRoleType>({
    frontend: 0,
    backend: 0,
    designer: 0,
  });

  const handleChangeMax = (role: string) => {
    setRoleValues((prev) => ({ ...prev, [role]: prev[role as keyof typeof roleValues] + 1 }));
  };

  const handleChangeMin = (role: string) => {
    if (roleValues[role as keyof typeof roleValues] === 0) return;
    setRoleValues((prev) => ({ ...prev, [role]: prev[role as keyof typeof roleValues] - 1 }));
  };

  useEffect(() => {
    dispatch(promptActions.setGptRoleConfig(roleValues));
  }, [roleValues]);
  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });

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
              backgroundImage: `url(${arrowDownUrl})`,
            }}
          ></span>
        </button>
        {dropdownState.open && (
          <div className="dropdown">
            <ul>
              {roles.map((role, i) => (
                <li className="flex justify-between w-52 bg-gray p-3 rounded-lg" key={i}>
                  <span>{role.roleRu}</span>
                  <div className="flex align-middle">
                    <button
                      className="mr-2"
                      onClick={() => {
                        // handleRoleClickMin(i);
                        handleChangeMin(role.roleEn);
                      }}
                    >
                      <img src={minusUrl} alt="Минус" />
                    </button>
                    <span>{roleValues[role.roleEn as keyof typeof roleValues]}</span>
                    <button
                      className="ml-2"
                      onClick={() => {
                        // handleRoleClickMax(i);
                        handleChangeMax(role.roleEn);
                      }}
                    >
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
