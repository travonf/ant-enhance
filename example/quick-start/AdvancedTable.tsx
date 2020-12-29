/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { AdvancedTable } from 'ant-enhance';
import columns from './columns';
import dataSource from './dataSource.json';

export default () => (
  <AdvancedTable
    columns={columns}
    dataSource={dataSource}
    pagination={false}
    /**
     * 扩展属性
     */
    headerTitle="高级表格"
    detailList={{
      column: 2,
    }}
  />
);
