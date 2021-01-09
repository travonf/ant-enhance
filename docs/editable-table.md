---
order: 3
---

# 编辑表格

## 简介

通过扩展 antd Table 属性，配置化 columns 定义，支持全部的输入组件，简化代码编写，

## 特性

- 兼容 antd 全部的数据录入组件
- 全面拥抱 typescript，支持类型定义，极大的提升了开发体验
- 高度可配置化，包括静态配置，动态配置
- 字段联动，某个字段改变控制其他字段变化

## 演示

### 基本用法

```jsx
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
