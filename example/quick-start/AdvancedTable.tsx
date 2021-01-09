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
    toolbar={{
      title: '高级表格',
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
    detailList={{
      column: 2,
    }}
  />
);
