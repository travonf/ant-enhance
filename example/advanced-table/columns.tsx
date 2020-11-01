import React from 'react';
import moment, { Moment } from 'moment';
import { Switch, Rate, Slider, TreeSelect, Button } from 'antd';
import {
  AudioOutlined,
  EditOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { EditableTable } from 'ant-enhance';
import { IColumnProps } from 'ant-enhance/es/advanced-table';
import { tag, flatTree, shouldUpdate, ItemOfOption, ItemToOption } from 'ant-enhance/es/utils';
import { fullLayout, halfLayout } from './layouts';
import { OPTIONS, LABEL_TREE, TITLE_TREE, TRANSFER_DATA } from './options';
import { IRecord } from './typings';

const columns: IColumnProps<IRecord>[] = [
  /**
   * 文本显示
   */
  {
    title: '文本',
    dataIndex: 'Text',
    width: 160,
    ellipsis: true,
    hideInSearch: false,
    layout: halfLayout,
    dataEntry: {
      /**
       * https://ant.design/components/typography-cn/#Typography.Text
       */
      ComponentType: 'Text',
      // code: true,
      copyable: true,
      // delete: true,
      // disabled: true,
      //   editable: true,
      ellipsis: true,
      // mark: true,
      // keyboard: true,
      underline: true,
      strong: true,
      type: 'success',
    },
    formItemProps: {
      valuePropName: 'children',
    },
    render: (text: string) => <span style={{ fontFamily: '"Fira Code", monospace' }}>{text}</span>,
  },
  {
    title: '链接',
    dataIndex: 'Link',
    width: 160,
    ellipsis: true,
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      /**
       * https://ant.design/components/typography-cn/#Typography.Text
       */
      ComponentType: 'Link',
      target: '_blank',
      children: '点击打开',
    },
    formItemProps: {
      valuePropName: 'href',
    },
  },
  {
    title: '段落',
    dataIndex: 'Paragraph',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
    layout: fullLayout,
    dataEntry: {
      /**
       * https://ant.design/components/typography-cn/#Typography.Paragraph
       */
      ComponentType: 'Paragraph',
      // code: true,
      copyable: true,
      // delete: true,
      // disabled: true,
      editable: true,
      ellipsis: {
        rows: 3,
        expandable: true,
        // suffix: '...',
        // symbol: '...',
      },
      // mark: true,
      // keyboard: true,
      // underline: true,
      // strong: true,
      type: 'secondary',
    },
    formItemProps: {
      valuePropName: 'children',
    },
    listItemProps: {
      span: 2,
    },
    // hideInList: true,
  },

  /**
   * 输入
   */
  {
    title: '数字输入',
    dataIndex: 'InputNumber',
    align: 'right',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'InputNumber',
      min: 0,
      max: 100,
      formatter: (value: number) => `${value}%`,
      parser: (value: string) => value.replace('%', ''),
      step: 10,
      onChange: console.log,
    },
  },
  {
    title: '文本输入',
    dataIndex: 'Input',
    ellipsis: true,
    hideInSearch: false,
    layout: halfLayout,
    dataEntry: (record, form) => ({
      // placeholder: '请输入',
      ComponentType: 'Input',
      prefix: <EditOutlined />,
      suffix: <AudioOutlined style={{ color: '#1890ff' }} />,
      /**
       * 表单联动
       * 演示如何控制文本字段
       */
      onChange: (e: any) => form.setFieldsValue({ Text: e.target.value }),
    }),
  },
  {
    title: '自动完成',
    dataIndex: 'AutoComplete',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'AutoComplete',
      options: OPTIONS,
    },
  },
  {
    title: '提及',
    dataIndex: 'Mentions',
    ellipsis: true,
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'Mentions',
      options: OPTIONS,
    },
    render: (text: string) => `@${text}`,
  },
  {
    title: '多行输入',
    dataIndex: 'TextArea',
    width: 600,
    ellipsis: true,
    hideInSearch: true,
    layout: fullLayout,
    dataEntry: (record, form) => {
      return {
        // placeholder: '请输入',
        ComponentType: 'Input.TextArea',
        autoSize: { maxRows: 6 },
        showCount: true,
        maxLength: 255,
        /**
         * 表单联动
         * 通过其他字段值变化控制当前字段的属性
         */
        disabled: !!form.getFieldValue('Switch'),
      };
    },
    formItemProps: {
      // dependencies: ['Switch'],
      shouldUpdate: shouldUpdate('Switch'),
    },
    listItemProps: {
      span: 2,
    },
    hideInTable: false,
    render: (text: string) => (
      <pre
        style={{
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'keep-all',
        }}
      >
        {text}
      </pre>
    ),
  },
  /**
   * 选择
   */
  {
    title: '开关',
    dataIndex: 'Switch',
    width: 60,
    align: 'center',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: (record, form) => ({
      // placeholder: '请输入',
      ComponentType: 'Switch',
      /**
       * 表单联动
       * 演示如何控制其他字段值
       */
      onChange: (e: boolean) => {
        // 禁用时清理Rate字段值
        if (e) form.resetFields(['Rate']);
      },
    }),
    formItemProps: {
      valuePropName: 'checked',
    },
    render: (text: boolean) => <Switch checked={text} />,
  },
  {
    title: '评分',
    dataIndex: 'Rate',
    width: 180,
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: (record, form) => ({
      // placeholder: '请输入',
      ComponentType: 'Rate',
      /**
       * 表单联动
       * 演示如何控制输入组件的属性
       */
      disabled: !!form.getFieldValue('Switch'),
    }),
    formItemProps: (record, form) => ({
      /**
       * 表单联动
       * 演示如何控制表单项属性
       * 通过其他字段值变化控制当前字段的属性
       * 支持shouldUpdate或dependencies，但是不要同时使用
       */
      // shouldUpdate: (prev, curr) => prev.Switch !== curr.Switch,
      dependencies: ['Switch'],
      rules: [
        {
          required: !form.getFieldValue('Switch'),
          message: '评分是必填项',
        },
      ],
    }),
    render: (text: number) => <Rate value={text} />,
  },
  {
    title: '滑块',
    dataIndex: 'Slider',
    width: 200,
    hideInSearch: true,
    layout: fullLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'Slider',
      //   tooltipVisible: false,
    },
    listItemProps: {
      span: 2,
    },
    render: (text: number) => <Slider value={text} />,
  },
  {
    title: '单选',
    dataIndex: 'Radio',
    width: 84,
    filters: OPTIONS.map(({ label, value }) => ({ text: label, value })),
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'Radio',
      options: OPTIONS,
    },
    render: text => [text].map(item => OPTIONS.find(({ value }) => value === item)).map(tag),
  },
  {
    title: '多选',
    dataIndex: 'Checkbox',
    width: 332,
    filters: OPTIONS.map(({ label, value }) => ({ text: label, value })),
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'Checkbox',
      options: OPTIONS,
    },
    render: (text: string[]) =>
      (text || []).map(item => OPTIONS.find(({ value }) => value === item)).map(tag),
  },
  {
    title: '选择器',
    dataIndex: 'Select',
    width: 212,
    filters: OPTIONS.map(({ label, value }) => ({ text: label, value })),
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'Select',
      mode: 'multiple',
      options: OPTIONS,
    },
    render: (text: string[]) =>
      (text || []).map(item => OPTIONS.find(({ value }) => value === item)).map(tag),
  },
  {
    title: '穿梭框',
    dataIndex: 'Transfer',
    width: 269,
    filters: TRANSFER_DATA.map(({ title, key, ...rest }) => ({ text: title, value: key, ...rest })),
    hideInSearch: true,
    layout: fullLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'Transfer',
      dataSource: TRANSFER_DATA,
      render: (item: { title: string }) => item.title,
      listStyle: { width: '100%' },
      titles: ['来源', '目标'],
    },
    formItemProps: {
      valuePropName: 'targetKeys',
    },
    render: (text: string[]) =>
      (text || [])
        .map(item => TRANSFER_DATA.find(({ key }) => key === item))
        // @ts-ignore
        .map(({ title, key, ...rest }) => ({ label: title, value: key, ...rest }))
        .map(tag),
  },
  {
    title: '级联选择',
    dataIndex: 'Cascader',
    width: 230,
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'Cascader',
      options: LABEL_TREE,
      bordered: true,
      expandTrigger: 'hover',
    },
    render: text => text.map(item => flatTree(LABEL_TREE).find(ItemOfOption(item) as any)).map(tag),
  },
  {
    title: '树选择',
    dataIndex: 'TreeSelect',
    width: 230,
    hideInSearch: true,
    layout: fullLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'TreeSelect',
      treeData: TITLE_TREE,
      treeCheckable: true,
      treeDefaultExpandAll: true,
      showCheckedStrategy: TreeSelect.SHOW_ALL,
    },

    render: (text: string[]) =>
      text
        .map(item => flatTree(TITLE_TREE).find(ItemOfOption(item) as any))
        .map(ItemToOption('title', 'value'))
        .map(tag),
  },
  /**
   * 日期选择
   */
  {
    title: '日期',
    dataIndex: 'DatePicker',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: (record, form) => ({
      // placeholder: '请输入',
      ComponentType: 'DatePicker',
      style: { width: '100%' },
      showTime: true,
      /**
       * 表单联动
       * 演示如何联动其他字段
       */
      onChange: (date: Moment) =>
        form.setFieldsValue({
          YearPicker: date as any,
          QuarterPicker: date as any,
          MonthPicker: date as any,
          WeekPicker: date as any,
          TimePicker: date as any,
        }),
    }),
    render: (text: string) => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: '年份',
    dataIndex: 'YearPicker',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'DatePicker',
      picker: 'year',
      style: { width: '100%' },
    },
    render: (text: string) => moment(text).format('YYYY'),
  },
  {
    title: '季度',
    dataIndex: 'QuarterPicker',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'DatePicker',
      picker: 'quarter',
      style: { width: '100%' },
    },
    render: (text: string) => moment(text).format('YYYY-Qo'),
  },
  {
    title: '月份',
    dataIndex: 'MonthPicker',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'DatePicker',
      picker: 'month',
      style: { width: '100%' },
    },
    render: (text: string) => moment(text).format('YYYY-MM'),
  },
  {
    title: '星期',
    dataIndex: 'WeekPicker',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'DatePicker',
      picker: 'week',
      style: { width: '100%' },
    },
    render: (text: string) => moment(text).format('dddd'),
  },
  {
    title: '时间',
    dataIndex: 'TimePicker',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: '请输入',
      ComponentType: 'TimePicker',
      style: { width: '100%' },
    },
    render: (text: string) => moment(text).format('HH:mm:ss'),
  },
  {
    title: '日期范围',
    dataIndex: 'DateRangePicker',
    width: 120,
    align: 'center',
    hideInSearch: true,
    layout: halfLayout,
    dataEntry: {
      // placeholder: ['请输入', '请输入'],
      ComponentType: 'RangePicker',
      style: { width: '100%' },
    },
    render: (text: [string, string]) =>
      text && (
        <pre style={{ margin: 0 }}>
          {text.map(item => moment(item).format('YYYY-MM-DD')).join('\n')}
        </pre>
      ),
  },
  {
    title: '时间范围',
    dataIndex: 'TimeRangePicker',
    width: 180,
    align: 'center',
    layout: halfLayout,
    hideInSearch: true,
    dataEntry: {
      // placeholder: ['请输入', '请输入'],
      ComponentType: 'RangePicker',
      style: { width: '100%' },
      showTime: true,
    },
    render: (text: [string, string]) => text && <pre style={{ margin: 0 }}>{text.join('\n')}</pre>,
  },
  /**
   * 其他
   */
  {
    title: '普通上传',
    dataIndex: 'Upload',
    ellipsis: true,
    layout: halfLayout,
    hideInSearch: true,
    dataEntry: {
      ComponentType: 'Upload',
      children: <Button icon={<UploadOutlined />}>点击上传</Button>,
    },
    formItemProps: {
      valuePropName: 'fileList',
      getValueFromEvent: (e: any) => e.fileList,
    },
    listItemProps: {
      span: 2,
    },
    render: (text: any[]) =>
      text && (
        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {text.map(item => (
            <li key={item.uid}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ol>
      ),
  },
  {
    title: '拖拽上传',
    dataIndex: 'Dragger',
    ellipsis: true,
    hideInSearch: true,
    layout: fullLayout,
    dataEntry: {
      ComponentType: 'Upload.Dragger',
      children: (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or
            other band files
          </p>
        </>
      ),
    },
    formItemProps: {
      valuePropName: 'fileList',
      getValueFromEvent: (e: any) => e.fileList,
    },
    listItemProps: {
      span: 2,
    },
    render: (text: any[]) =>
      text && (
        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {text.map(item => (
            <li key={item.uid}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ol>
      ),
  },
  /**
   * 自定义组件
   */
  {
    title: '表格',
    dataIndex: 'Table',
    hideInTable: true,
    hideInSearch: true,
    layout: fullLayout,
    dataEntry: {
      /**
       * 自定义组件
       * 这里演示了如何传入外部组件
       */
      ComponentType: EditableTable,
      rowKey: 'uid',
      columns: [
        {
          title: '#',
          dataIndex: 'uid',
        },
        {
          title: '文件名',
          dataIndex: 'name',
          editable: true,
          dataEntry: { type: 'Input' },
        },
        {
          title: '状态',
          dataIndex: 'status',
          editable: true,
          dataEntry: { type: 'Input' },
        },
        {
          title: 'url',
          dataIndex: 'url',
          editable: true,
          dataEntry: { type: 'Input' },
        },
      ],
      pagination: false,
    },
    formItemProps: {
      valuePropName: 'dataSource',
    },
    render: (text: any[]) => (
      <pre
        style={{
          margin: 0,
          height: 200,
          overflow: 'auto',
        }}
      >
        {JSON.stringify(text, null, 2)}
      </pre>
    ),
  },
  {
    title: '操作',
    key: '__OPERATIONS__',
    width: 160,
    align: 'center',
    fixed: 'right',
    hideInSearch: true,
    hideInList: true,
    hideInForm: true,
    render: (text, record) => [
      /**
       * 演示如何自定义操作栏
       * 三个预设值可随意更换位置
       */
      '<detail>',
      '<update>',
      '<delete>',
      <Button
        key="info"
        title="信息"
        type="link"
        icon={<InfoCircleOutlined />}
        onClick={console.log}
      />,
    ],
  },
];

export default columns;
