import React from 'react';
import RolesDropdown from './RolesDropdown';
import DataDropdown from './DataDropdown';

const Filter = () => {
  return (
    <div className="flex mt-2 text-base">
      <RolesDropdown />
      <DataDropdown />
      <p className="mt-2">*Для более точных ответов заполните фильтры</p>
    </div>
  );
};

export default Filter;
