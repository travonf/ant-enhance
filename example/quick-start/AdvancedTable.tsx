/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { Table } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import { AdvancedTable } from 'ant-enhance';
import columns from './columns';
import dataSource from './dataSource.json';

export default () => (
  <AdvancedTable
    columns={columns}
    dataSource={dataSource}
    pagination={false}
    /**
     * 多选操作
     */
    rowSelection={{
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
    }}
    /**
     * 扩展属性
     */
    toolbar={{
      title: (
        <span>
          <TableOutlined /> 高级表格
        </span>
      ),
      actions: ['自定义组件'],
      settings: {
        reload: true,
        density: true,
        import: true,
        export: true,
        setting: true,
        fullscreen: true,
      },
    }}
    onWrapperShow={console.log}
    onWrapperHide={console.log}
    searchForm={{}}
    detailList={{
      column: 2,
    }}
  />
);
