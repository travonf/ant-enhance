import React from 'react';
import { Form } from 'antd';
import { EditableTable } from 'ant-enhance';
import columns from './columns';
import dataSource from './dataSource.json';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="editable_table" valuePropName="dataSource" initialValue={dataSource}>
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
