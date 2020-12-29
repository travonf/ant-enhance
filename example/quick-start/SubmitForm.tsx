import React from 'react';
import { Form } from 'antd';
import { SubmitForm } from 'ant-enhance';
import columns from './columns';
import dataSource from './dataSource.json';

export default () => {
  const [submitForm] = Form.useForm();
  return (
    <SubmitForm name="submit-form" form={submitForm} columns={columns} record={dataSource[0]} />
  );
};
