import React from 'react';
import { Moment } from 'moment';
import { ColumnProps, TableProps } from 'antd/es/table';

export interface IRecord {
  editing: boolean;
  newly: boolean;
  depth: number;
  [key: string]: any;
}

export interface IResponse {
  code: 200 | 500;
  data: IRecord;
  mesg: string;
}

export interface IRelationship {
  dataIndex: string; // 被关联字段名
  dataSource: any[]; // 数据源{"当前字段名": "值", "被关联字段名": "值"}
}

export type TDataEntryType =
  | 'AutoComplete'
  | 'Checkbox'
  | 'Cascader'
  | 'DatePicker'
  | 'DatePicker.RangePicker'
  | 'Input'
  | 'Input.TextArea'
  | 'InputNumber'
  | 'Mentions'
  | 'Rate'
  | 'Radio'
  | 'Switch'
  | 'Slider'
  | 'Select'
  | 'TreeSelect'
  | 'Transfer'
  | 'TimePicker'
  | 'Upload'
  // 扩展组件
  | 'SearchPerson'
  | 'SearchProject'
  | 'SearchQuestion';

export interface IOption {
  label: string;
  value: string;
}

export type TOptionsFn = (value: any, record: IRecord) => IOption[];
export type TRelationshipFn = (value: any, record: IRecord) => any[];

export type TDataEntry = {
  disabled?: boolean;
  type: TDataEntryType;
  allOption?: boolean;
  options?: IOption[] | TOptionsFn;
  [key: string]: any; // 可以是antd中各种输入组件的属性
};
export type TDataEntryFn = (value: any, record: IRecord) => TDataEntry;

export interface IDataProps {
  rowKey: string;
  field: string;
  value: any;
  record: any;
  ellipsis: boolean;
  relationships?: IRelationship[] | TRelationshipFn;
  dataEntry?: TDataEntry | TDataEntryFn;
  onChange: Function;
}

export type TItem2Option = (item: IOption) => React.ReactNode;
export type TMomentVld = (format: string) => (value: any) => Moment | undefined;
export type TMomentFmt = (format: string) => (value: any) => string | null;

export interface ColumnsPropsWithExtraProps<T> extends ColumnProps<T> {
  editable?: boolean;
  dataEntry?: TDataEntry | TDataEntryFn;
  relationships?: IRelationship[] | TRelationshipFn;
}

export interface IProps<T = IRecord> extends Omit<TableProps<T>, 'onChange'> {
  rowKey: string;
  columns: ColumnsPropsWithExtraProps<T>[];
  onValidate?: (record: T) => IResponse;
  onChange?: (dataSource: T[]) => void;
  onToggle?: Function; // 暂未实现，进入编辑状态时
  onInsert?: Function; // 暂未实现，新增记录时
  onUpdate?: (record: IRecord) => void; // 添加新增数据或编辑原有数据时
  onCancel?: Function; // 暂未实现，编辑状态取消时
  onDelete?: Function; // 暂未实现，删除新增数据或删除原有数据时
}

export interface IState {
  loading: boolean;
}
