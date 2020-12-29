import React from 'react';
import { Form } from 'antd';
import { UpdateForm } from 'ant-enhance';
import columns from './columns';
import dataSource from './dataSource.json';

export default () => {
  const [updateForm] = Form.useForm();
  return (
    <UpdateForm name="update-form" form={updateForm} columns={columns} record={dataSource[0]} />
  );
};
