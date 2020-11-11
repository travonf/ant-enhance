import React from 'react';
import { Table } from 'antd';
import { ISearchTable } from '../typings';

function SearchTable<IRecord extends object = {}>(props: ISearchTable<IRecord>) {
  const { columns = [], ...restProps } = props;

  return (
    <>
      <Table<IRecord> columns={columns} {...restProps} />
    </>
  );
}

export default SearchTable;
