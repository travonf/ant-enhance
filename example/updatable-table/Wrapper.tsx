/**
 * title: 表单容器
 * desc: 弹出表单的容器支持抽屉和模态框两种形式，默认为抽屉。当然也可以自定义容器标题和宽度。
 */
import React from 'react';
import moment from 'moment';
import { message } from 'antd';
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
      wrapper={{
        edit: {
          type: 'Modal',
          title: '正在编辑中，完成后记得提交!!!',
          width: '60vw',
        },
      }}
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
