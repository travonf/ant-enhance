/**
 * title: 基本用法
 * desc: 像 antd Table 那样使用，提供 columns 及 dataSource，支持 antd table 其他属性
 */
import React from 'react';
import moment from 'moment';
import { message } from 'antd';
import { AdvancedTable as Table } from 'ant-enhance';
import { IColumnProps } from 'ant-enhance/es/advanced-table';
import { delay } from 'ant-enhance/es/utils';
import { IRecord } from './typings';
import { getData } from './services';

const columns: IColumnProps<IRecord>[] = [
  {
    title: '文本',
    dataIndex: 'Text',
    ellipsis: true,
    dataEntry: {
      /**
       * https://ant.design/components/typography-cn/#Typography.Text
       */
      ComponentType: 'Text',
      copyable: true,
      ellipsis: true,
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
    dataEntry: {
      ComponentType: 'Input',
      placeholder: '请输入',
    },
  },
  {
    title: '选项',
    dataIndex: 'Select',
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
      onUpdate={async (values: IRecord) => {
        console.log(values);
        message.loading('正在更新');
        await delay(1000);
        message.success('正在更新');
      }}
      onDelete={async (values: IRecord) => {
        console.log(values);
        message.loading('正在删除');
        await delay(1000);
        message.success('提交成功');
      }}
    />
  );
};
