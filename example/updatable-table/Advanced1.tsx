/**
 * title: 主动联动
 * desc: 通过调用form方法动态更改联动字段
 */
import React from 'react';
import moment, { Moment } from 'moment';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UpdatableTable as Table } from 'ant-enhance';
import { IColumnProps } from 'ant-enhance/es/updatable-table';
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
    formItemProps: {
      valuePropName: 'children',
    },
  },
  {
    title: '输入',
    dataIndex: 'Input',
    ellipsis: true,
    dataEntry: (record, form) => ({
      ComponentType: 'Input',
      placeholder: '请输入',
      /**
       * 表单联动
       * 演示如何控制文本字段
       */
      onChange: (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        form.setFieldsValue({ Text: e.currentTarget.value });
      },
    }),
  },
  {
    title: '选项',
    dataIndex: 'Select',
    ellipsis: true,
    dataEntry: (record: IRecord, form: FormInstance<IRecord>) => ({
      ComponentType: 'Select',
      mode: 'multiple',
      options: [
        { label: '选项一', value: '1', disabled: true },
        { label: '选项二', value: '2', disabled: false },
        { label: '选项三', value: '3', disabled: false },
        { label: '选项四', value: '4', disabled: false },
        { label: '选项五', value: '5', disabled: false },
      ],
      /**
       * 表单联动
       * 演示如何控制文本字段
       */
      onChange: (value: string, option: { label: string; value: string; disabled?: boolean }) => {
        form.setFieldsValue({ Text: value });
      },
    }),
    render: (text: string[]) => text && text.join(', '),
  },
  {
    title: '日期',
    dataIndex: 'DatePicker',
    ellipsis: true,
    dataEntry: (record: IRecord, form: FormInstance<IRecord>) => ({
      ComponentType: 'DatePicker',
      style: { width: '100%' },
      showTime: true,
      /**
       * 表单联动
       * 演示如何控制文本字段
       */
      onChange: (date: Moment, dateString: string) => {
        form.setFieldsValue({
          // 这里要将时间序列化
          Text: moment(date).format('YYYY-MM-DD HH:mm:ss'),
        });
      },
    }),
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
