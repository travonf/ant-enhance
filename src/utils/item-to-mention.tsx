import React from 'react';
import { Mentions } from 'antd';
import { Any } from './typings';

function itemToMention<Option extends Any = {}>({ label, value, disabled = false }: Option) {
  return (
    <Mentions.Option key={value} value={value} disabled={disabled}>
      {label}
    </Mentions.Option>
  );
}

export default itemToMention;
