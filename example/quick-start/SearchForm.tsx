import React from 'react';
import { Form } from 'antd';
import { SearchForm } from 'ant-enhance';
import columns from './columns';
import dataSource from './dataSource.json';

export default () => {
  const [searchForm] = Form.useForm();
  return (
    <SearchForm name="search-form" form={searchForm} columns={columns} record={dataSource[0]} />
  );
};
