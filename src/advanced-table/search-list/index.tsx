import React from 'react';
import { Table } from 'antd';
import { ISearchList } from '../typings';

function SearchList<IRecord extends Record<string, any> = any>(props: ISearchList<IRecord>) {
  const { columns = [], ...restProps } = props;

  return (
    <>
      <Table<IRecord> columns={columns} {...restProps} />
    </>
  );
}

export default SearchList;
