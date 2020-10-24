import React from 'react';
import { Tag } from 'antd';

interface Option {
  label: string;
  value: string;
  color?: string;
}

function tag(item: Option) {
  const { label, value, color } = item;

  return (
    <Tag key={value} title={value} color={color}>
      {label}
    </Tag>
  );
}

export default tag;
