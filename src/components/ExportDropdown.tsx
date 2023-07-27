import React, { useState } from 'react';

const imgUrl = new URL('../images/fe_arrow-down.svg', import.meta.url);

const ExportDropdown = () => {
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
          Export to Trello
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
              <li className="w-52 bg-gray p-3 rounded-lg">
                <button>All</button>
              </li>
              <li className="w-52 bg-gray p-3 rounded-lg">
                <button>Only selected</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportDropdown;
