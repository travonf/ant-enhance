import React from 'react';
import { Space, Button } from 'antd';

const ToolBar: React.FC<Toolbar> = ({ title = '', actions = [], settings = [] }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
    >
      <Space
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      </Space>
      <Space size={16} align="center">
        <Space size={12} align="center">
          {actions}
        </Space>
        <Space size={12} align="center">
          {settings}
        </Space>
      </Space>
    </div>
  );
};

export default ToolBar;

interface Toolbar {
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 操作
   */
  actions?: React.ReactNode[];
  /**
   * 设置
   */
  settings?: React.ReactNode[];
}
