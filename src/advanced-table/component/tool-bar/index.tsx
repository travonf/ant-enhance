import React from 'react';
import { Space, Button } from 'antd';
/*
import {
  PlusOutlined,
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
*/

const ToolBar: React.FC<Toolbar> = ({ title = '', actions = [], settings = [] }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px 0',
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
      <Space
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Space size={12} align="center">
          {actions}
        </Space>
        {/*
        <Space size={12} align="center">
          <ReloadOutlined />
          <ColumnHeightOutlined />
          <SettingOutlined />
          <FullscreenOutlined />
          <FullscreenExitOutlined />
        </Space>
        */}
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
  actions?: any[];
  /**
   * 设置
   */
  settings?: any[];
}
