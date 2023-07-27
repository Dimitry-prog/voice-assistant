import React, { useState } from 'react';

const imgUrl = new URL('../images/fe_arrow-down.svg', import.meta.url);

const rolesWithCounts = [
  { role: 'Дизайнер', count: 0 },
  { role: 'Фронтендер', count: 0 },
  { role: 'Бэкендер', count: 0 },
];

const Dropdown = () => {
  const [dropdownState, setDropdownState] = useState<{ open: boolean }>({ open: false });

  const handleDropdownClick = (): void => setDropdownState({ open: !dropdownState.open });

  const handleRoleClickMin = (index: number) => {
    const updatedRoles = [...rolesWithCounts];
    updatedRoles[index].count = Math.max(0, updatedRoles[index].count - 1);
    setDropdownState({ open: true }); //тригерит ререндер
  };

  const handleRoleClickMax = (index: number) => {
    const updatedRoles = [...rolesWithCounts];
    updatedRoles[index].count = updatedRoles[index].count + 1;
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
              backgroundImage: 'url(' + imgUrl + ')',
            }}
          ></span>
        </button>
        {dropdownState.open && (
          <div className="dropdown">
            <ul>
              {rolesWithCounts.map((roleObj, i) => (
                <li className="w-52 bg-gray p-3 rounded-lg" key={i}>
                  {roleObj.role}
                  <button onClick={() => handleRoleClickMin(i)}>-</button>
                  <span>{roleObj.count}</span>
                  <button onClick={() => handleRoleClickMax(i)}>+</button>
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
