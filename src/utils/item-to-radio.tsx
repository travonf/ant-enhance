import React from 'react';
import { Radio } from 'antd';
import { Any } from './typings';

function itemToRadio<Option extends Any = {}>({ label, value, disabled = false }: Option) {
  return (
    <Radio key={value} value={value} disabled={disabled}>
      {label}
    </Radio>
  );
}

export default itemToRadio;
