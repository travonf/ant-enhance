![ant-enhance](/images/design_components.png)

# Ant Enhance

## 安装

```shell
$ npm i ant-enhance -S
# or
$ yarn add ant-enhance
```

## 使用

## 高级表格

```jsx
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
        render: text =>
          options
            .filter(ItemOfOption(text))
            .map(item => item.label)
            .join(', '),
      },
    ]}
    dataSource={[
      { key: 1, text: '标题一', select: '1' },
      { key: 2, text: '标题二', select: '2' },
      { key: 3, text: '标题三', select: '3' },
    ]}
    pagination={false}
  />
);
```

## 详情列表

> 高级表格的子组件，可以单独使用

```jsx
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
    bordered={false}
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
        render: text =>
          options
            .filter(ItemOfOption(text))
            .map(item => item.label)
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
        render: text =>
          options
            .filter(ItemOfOption(text))
            .map(item => item.label)
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
import React from 'react';
import { EditableTable } from 'ant-enhance';
import { ItemOfOption } from 'ant-enhance/es/utils';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default () => (
  <EditableTable
    columns={[
      {
        title: '文本',
        dataIndex: 'text',
      },
      {
        title: '选项',
        dataIndex: 'select',
        render: text =>
          options
            .filter(ItemOfOption(text))
            .map(item => item.label)
            .join(', '),
      },
    ]}
    dataSource={[
      { key: 1, text: '标题一', select: '1' },
      { key: 2, text: '标题二', select: '2' },
      { key: 3, text: '标题三', select: '3' },
    ]}
    pagination={false}
  />
);
```
