/**
 * title: 表单布局
 * desc: 你可以自定义弹出表单中表单项的布局，通过layout配置 Col 及 formItem 的布局属性，支持响应式写法。
 */
import React from 'react';
import moment from 'moment';
import { message } from 'antd';
import { AdvancedTable as Table } from 'ant-enhance';
import { IColumnProps } from 'ant-enhance/es/advanced-table';
import { delay } from 'ant-enhance/es/utils';
import { IRecord } from './typings';
import { getData } from './services';

const layout = {
  col: {
    lg: 0x18,
    xl: 0x0c,
  },
  formItem: {
    labelCol: {
      lg: 0x06,
    },
    wrapperCol: {
      lg: 0x12,
    },
  },
};
const columns: IColumnProps<IRecord>[] = [
  {
    title: '文本',
    dataIndex: 'Text',
    ellipsis: true,
    layout,
    dataEntry: {
      /**
       * https://ant.design/components/typography-cn/#Typography.Text
       */
      ComponentType: 'Text',
      copyable: true,
      ellipsis: false,
      underline: true,
      strong: true,
      type: 'success',
    },
    updateFormItemProps: {
      valuePropName: 'children',
    },
  },
  {
    title: '输入',
    dataIndex: 'Input',
    ellipsis: true,
    layout,
    dataEntry: {
      ComponentType: 'Input',
      placeholder: '请输入',
    },
  },
  {
    title: '选项',
    dataIndex: 'Select',
    layout,
    ellipsis: true,
    dataEntry: {
      ComponentType: 'Select',
      mode: 'multiple',
      options: [
        { label: '选项一', value: '1', disabled: true },
        { label: '选项二', value: '2', disabled: false },
        { label: '选项三', value: '3', disabled: false },
        { label: '选项四', value: '4', disabled: false },
        { label: '选项五', value: '5', disabled: false },
      ],
    },
    render: (text: string[]) => text && text.join(', '),
  },
  {
    title: '日期',
    dataIndex: 'DatePicker',
    ellipsis: true,
    layout,
    dataEntry: {
      ComponentType: 'DatePicker',
      style: { width: '100%' },
      showTime: true,
    },
    render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
];

export default () => {
  const [value, setValue] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async function() {
      setLoading(true);
      const resp = await getData();
      setValue(resp?.data);
      await delay(2000);
      setLoading(false);
    })();
  }, []);

  return (
    <Table
      rowKey="id"
      columns={columns}
      loading={loading}
      dataSource={value}
      pagination={false}
      onUpdate={(values: IRecord) => {
        console.log(values);
        message.success('提交成功');
      }}
      onDelete={(values: IRecord) => {
        console.log(values);
        message.success('提交成功');
      }}
    />
  );
};
