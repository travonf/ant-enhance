import React from 'react';
import { Select } from 'antd';
import { Any } from './typings';

function itemToSelect<Option extends Any = {}>({ label, value, disabled = false }: Option) {
  return (
    <Select.Option key={value} value={value} disabled={disabled}>
      {label}
    </Select.Option>
  );
}

export default itemToSelect;
