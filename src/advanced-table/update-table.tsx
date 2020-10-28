import React from 'react';
import { Table } from 'antd';
import { ITableProps } from './typings';

function UpdateTable<IRecord extends object = {}>(props: ITableProps<IRecord>) {
  const { columns = [], onUpdate, onError, onDelete, ...restProps } = props;

  return (
    <>
      <Table<IRecord> columns={columns} {...restProps} />
    </>
  );
}

export default UpdateTable;
