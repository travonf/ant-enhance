<!-- ![ant-enhance](./public/images/design_components.png) -->

# 简介

通过在 antd Table 的基础上扩展了一些属性，附带一个编辑功能的弹出表单，从而简化用户代码编写。你需要自己管理数据源的获取

## 特性

- 兼容 antd 全部的数据录入组件
- 全面拥抱 typescript，支持类型定义，极大的提升了开发体验
- 高度可配置化，包括静态配置，动态配置（通过控制反转实现）
  - 表单联动，某个字段改变控制其他字段变化
- 自动处理数据，无需手动序列化 moment 格式的日期

## 安装

```shell
$ npm i ant-enhance -S
# or
$ yarn add ant-enhance
```

## 使用

```tsx
import React from 'react';
import { AdvancedTable as Table } from 'ant-enhance';
import { IColumnProps } from 'ant-enhance/es/advanced-table';

interface IRecord {
  dataIndex: string;
}

const layout = {
  searchForm: {
    col: {
      /* 参考Col */
      sm: 0x18,
      lg: 0x18,
      xl: 0x0c,
    },
    formItem: {
      labelCol: {
        /* 参考labelCol */
        sm: 0x18,
        lg: 0x18,
        xl: 0x06,
      },
      wrapperCol: {
        /* 参考wrapperCol */
        sm: 0x18,
        lg: 0x18,
        xl: 0x12,
      },
    },
  },
  updateForm: {
    col: {
      /* 参考Col */
      sm: 0x18,
      lg: 0x18,
      xl: 0x0c,
    },
    formItem: {
      labelCol: {
        /* 参考labelCol */
        sm: 0x18,
        lg: 0x18,
        xl: 0x06,
      },
      wrapperCol: {
        /* 参考wrapperCol */
        sm: 0x18,
        lg: 0x18,
        xl: 0x12,
      },
    },
  },
};

const columns: IColumnProps<IRecord>[] = [
  {
    title: '#',
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '标题',
    dataIndex: 'title',
    // width: 160,
    /**
     * 用户可以自定义布局属性，支持部分定义
     */
    layout,
    /**
     * 数据录入属性
     * 支持antd官方全部数据录入组件
     * 支持函数形式(record: IRecrd, form) => dataEntry
     */
    dataEntry: {
      ComponentType: 'Input',
      /* 数据录入组件属性 */
    },
  },
  {
    title: '选项',
    dataIndex: 'select',
    layout,
    dataEntry: {
      ComponentType: 'Select',
      /* 数据录入组件属性 */
      options: [
        { label: '选项一', value: '1', disabled: false },
        { label: '选项二', value: '2', disabled: false },
        { label: '选项三', value: '3', disabled: false },
        { label: '选项四', value: '4', disabled: false },
        { label: '选项五', value: '5', disabled: true },
      ],
    },
  },
  {
    title: '日期',
    dataIndex: 'datetime',
    layout,
    dataEntry: {
      ComponentType: 'DatePicker',
      /* 数据录入组件属性 */
    },
  },
];

// 声明组件并返回即可
export default () => (
  <Table<IRecord>
    /**
     * 弹出表单的容器，支持Drawer和Modal
     */
    wrapper={{
      view: { type: 'Modal' },
      edit: { type: 'Modal' },
    }}
    /**
     * 其余属性与antd Table保持一致
     */
    rowKey="id"
    columns={columns}
    dataSource={[
      { id: 1, title: '标题一', select: '1', datetime: '2020-01-01 08:13:14' },
      { id: 2, title: '标题二', select: '2', datetime: '2020-02-02 08:13:14' },
      { id: 3, title: '标题三', select: '3', datetime: '2020-03-03 08:13:14' },
      { id: 4, title: '标题四', select: '4', datetime: '2020-04-04 08:13:14' },
      { id: 5, title: '标题五', select: '5', datetime: '2020-05-05 08:13:14' },
    ]}
    pagination={false}
    onUpdate={console.log}
    onDelete={console.log}
  />
);
```

## 配置

以下只列出与 antd Table 不同的属性，其余的参考 antd 官方文档

### Table

```typescript
wrapper?: {
  type?: 'Drawer' | 'Modal';
  title?: any;
  width?: any;
}
```

### Column

```typescript
/**
 * 是否渲染
 */
hideInSearchTable?: boolean;
hideInSearchForm?: boolean;
hideInDetailList?: boolean;
hideInUpdateForm?: boolean;
/**
 * 布局
 */
layout?: {
  searchForm?: {
    col: {},
    formItem: { labelCol: {}, wrapperCol: {} }
  }
   updateForm?: {
    col: {},
    formItem: { labelCol: {}, wrapperCol: {} }
  }
};
/**
 * 额外属性
 */
searchFormItemProps?: FormItemProps
detailListItemProps?: {}
updateFormItemProps?: FormItemProps
/**
 * 核心属性
 * 弹出表单根据此配置渲染输入组件
 */
dataEntry?: DataEntry | DataEntryFn<T>;
```
