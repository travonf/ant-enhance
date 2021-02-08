/**
 * title: 嵌套字段
 * desc: 表格、表单中字段支持嵌套
 */
import React from 'react';
import moment from 'moment';
import { message } from 'antd';
import { AdvancedTable as Table } from 'ant-enhance';
import { IColumnProps } from 'ant-enhance/es/advanced-table';
import { delay } from 'ant-enhance/es/utils';
import { IRecord } from './typings';
// import { getData } from './services';

const genData = (id: number) => ({
  id: (id < 9 ? '0' : '') + (id + 1),
  Text: { value: 'Text' },
  Input: { value: 'Input' },
  Select: { value: ['1', '2', '3'] },
  DatePicker: { value: '2020-01-01 00:00:00' },
});

const initialValue = Array.from(Array(20), (_, i) => genData(i));

const columns: IColumnProps<IRecord>[] = [
  {
    title: '文本',
    dataIndex: ['Text', 'value'],
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
    dataIndex: ['Input', 'value'],
    ellipsis: true,
    dataEntry: {
      ComponentType: 'Input',
      placeholder: '请输入',
    },
  },
  {
    title: '选项',
    dataIndex: ['Select', 'value'],
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
    dataIndex: ['DatePicker', 'value'],
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
  const [value, setValue] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(false);

  /*
  React.useEffect(() => {
    (async function () {
      setLoading(true);
      const resp = await getData();
      setValue(resp?.data);
      await delay(2000);
      setLoading(false);
    })();
  }, []);
   */

  return (
    <Table
      rowKey="id"
      columns={columns}
      loading={loading}
      dataSource={value}
      pagination={false}
      /**
       * 自定义属性
       */
      toolbar={{
        title: '嵌套字段',
        actions: [],
      }}
      onDetail={async (values: IRecord) => {
        console.log(values);
        message.loading('正在查询');
        await delay(1000);
        message.success('查询成功');
        const data = genData(Math.round(Math.random() * 10));
        console.log(data);
        return data;
      }}
      onSubmit={async (values: IRecord) => {
        console.log(values);
        message.loading('正在提交');
        await delay(1000);
        message.success('提交成功');
      }}
      onUpdate={async (values: IRecord) => {
        console.log(values);
        message.loading('正在更新');
        await delay(1000);
        message.success('更新成功');
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
