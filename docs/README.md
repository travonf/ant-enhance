<!-- ![ant-enhance](/images/design_components.png) -->

# 快速开始

## 安装

```shell
$ npm i ant-enhance -S
# or
$ yarn add ant-enhance
```

## 使用

## 高级表格

```jsx
/**
 * background: '#f6f7f9'
 */

import React from 'react';
import { AdvancedTable } from 'ant-enhance';
import { ItemOfOption } from 'ant-enhance/es/utils';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default () => (
  <AdvancedTable
    columns={[
      {
        title: '文本',
        dataIndex: 'text',
        dataEntry: {
          ComponentType: 'Input',
        },
      },
      {
        title: '选项',
        dataIndex: 'select',
        dataEntry: {
          ComponentType: 'Select',
          options,
        },
        render: (text) =>
          options
            .filter(ItemOfOption(text))
            .map((item) => item.label)
            .join(', '),
      },
    ]}
    dataSource={[
      { key: 1, text: '标题一', select: '1' },
      { key: 2, text: '标题二', select: '2' },
      { key: 3, text: '标题三', select: '3' },
    ]}
    pagination={false}
    headerTitle="高级表格"
  />
);
```

## 检索表单

> 高级表格的子组件，可以单独使用

## 详情列表

> 高级表格的子组件，可以单独使用

```jsx
/**
 * background: '#f6f7f9'
 */

import React from 'react';
import { DetailList } from 'ant-enhance';
import { ItemOfOption } from 'ant-enhance/es/utils';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default () => (
  <DetailList
    bordered
    columns={[
      {
        title: '文本',
        dataIndex: 'text',
        dataEntry: {
          ComponentType: 'Input',
        },
      },
      {
        title: '选项',
        dataIndex: 'select',
        dataEntry: {
          ComponentType: 'Select',
          options,
        },
        render: (text) =>
          options
            .filter(ItemOfOption(text))
            .map((item) => item.label)
            .join(', '),
      },
    ]}
    record={{ key: 1, text: '标题一', select: '1' }}
  />
);
```

## 更新表单

> 高级表格的子组件，可以单独使用

```jsx
/**
 * background: '#f6f7f9'
 */

import React from 'react';
import { UpdateForm } from 'ant-enhance';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default () => (
  <UpdateForm
    columns={[
      {
        title: '文本',
        dataIndex: 'text',
        dataEntry: {
          ComponentType: 'Input',
          placeholder: '请输入一些内容',
        },
      },
      {
        title: '选项',
        dataIndex: 'select',
        dataEntry: {
          ComponentType: 'Select',
          placeholder: '请选择一个选项',
          options,
        },
        render: (text) =>
          options
            .filter(ItemOfOption(text))
            .map((item) => item.label)
            .join(', '),
      },
    ]}
    record={{ key: 1, text: '标题一', select: '1' }}
  />
);
```

## 编辑表格

> 可以作为更新表单的扩展输入组件，可以单独使用

```jsx
/**
 * background: '#f6f7f9'
 */

import React from 'react';
import { Form } from 'antd';
import { EditableTable } from 'ant-enhance';
import { ItemOfOption } from 'ant-enhance/es/utils';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="editable_table"
        valuePropName="dataSource"
        initialValue={[
          { key: 1, text: '标题一', select: '1' },
          { key: 2, text: '标题二', select: '2' },
          { key: 3, text: '标题三', select: '3' },
        ]}
      >
        <EditableTable
          rowKey="key"
          columns={[
            {
              title: '文本',
              dataIndex: 'text',
              editable: true,
              dataEntry: {
                type: 'Input',
              },
            },
            {
              title: '选项',
              dataIndex: 'select',
              editable: true,
              dataEntry: {
                type: 'Select',
                options,
              },
              /*
              render: text =>
                options
                  .filter(ItemOfOption(text))
                  .map(item => item.label)
                  .join(', '),
               */
            },
          ]}
          pagination={false}
        />
      </Form.Item>
    </Form>
  );
};
```
