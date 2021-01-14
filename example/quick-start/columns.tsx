import React from 'react';
import moment from 'moment';
import { Switch, Rate, Slider } from 'antd';
import { ItemOfOption } from 'ant-enhance/es/utils';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

export default [
  {
    title: '文本',
    dataIndex: 'text',
    dataEntry: {
      ComponentType: 'Input',
      placeholder: '输入一些文本',
    },
  },
  {
    title: '选项',
    dataIndex: 'select',
    dataEntry: {
      ComponentType: 'Select',
      placeholder: '选择一个选项',
      options,
    },
    render: (text) =>
      options
        .filter(ItemOfOption(text))
        .map((item) => item.label)
        .join(', '),
  },
  {
    title: '开关',
    dataIndex: 'switch',
    dataEntry: {
      ComponentType: 'Switch',
    },
    searchFormItemProps: {
      valuePropName: 'checked',
    },
    submitFormItemProps: {
      valuePropName: 'checked',
    },
    updateFormItemProps: {
      valuePropName: 'checked',
    },
    render: (text: boolean) => <Switch checked={text} />,
  },
  {
    title: '评分',
    dataIndex: 'rate',
    dataEntry: {
      ComponentType: 'Rate',
    },
    render: (text: number) => <Rate value={text} />,
  },
  {
    title: '滑块',
    dataIndex: 'slider',
    dataEntry: {
      ComponentType: 'Slider',
    },
    render: (text: number) => <Slider value={text} />,
  },
  {
    title: '日期',
    dataIndex: 'date',
    dataEntry: {
      ComponentType: 'DatePicker',
      placeholder: '选择一个日期',
      style: { width: '100%' },
    },
    render: (text: string) => moment(text).format('YYYY-MM-DD'),
  },
];
