import React from 'react';
import { DetailList } from 'ant-enhance';
import columns from './columns';
import dataSource from './dataSource.json';

export default () => (
  <DetailList
    name="detail-list"
    bordered
    columns={columns}
    record={dataSource[0]}
    /**
     * 扩展属性
     */
    detailList={{
      column: 2,
    }}
  />
);
