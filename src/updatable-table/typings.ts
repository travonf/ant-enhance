import { TextProps } from 'antd/es/typography/Text';
import { LinkProps } from 'antd/es/typography/Link';
import { ParagraphProps } from 'antd/es/typography/Paragraph';
import { InputProps, TextAreaProps } from 'antd/es/input';
import { InputNumberProps } from 'antd/es/input-number';
import { MentionProps } from 'antd/es/mentions';
import { AutoCompleteProps } from 'antd/es/auto-complete';
import { SwitchProps } from 'antd/es/switch';
import { RateProps } from 'antd/es/rate';
import { SliderSingleProps, SliderRangeProps } from 'antd/es/slider';
import { RadioProps } from 'antd/es/radio';
import { CheckboxProps } from 'antd/es/checkbox';
import { CascaderProps } from 'antd/es/cascader';
import { SelectProps } from 'antd/es/select';
import { TreeSelectProps } from 'antd/es/tree-select';
import { TransferProps } from 'antd/es/transfer';
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { TimePickerProps } from 'antd/es/time-picker';
import { UploadProps, DraggerProps } from 'antd/es/upload';
import { TableProps, ColumnProps } from 'antd/es/table';
import { DescriptionsProps } from 'antd/es/descriptions';
import { DescriptionsItemProps } from 'antd/es/descriptions/Item';
import { FormProps, FormItemProps, FormInstance } from 'antd/es/form';
import { DrawerProps } from 'antd/es/drawer';
import { ModalProps } from 'antd/es/modal';
import { defaultLayout } from './layouts';

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  color?: string;
}

export type IDataEntry =
  /**
   * antd中全部输入组件的名称
   * https://ant.design/components/overview-cn/#数据录入
   */
  /**
   * 排版
   */
  | ({ ComponentType: 'Text' } & TextProps)
  | ({ ComponentType: 'Link' } & LinkProps)
  | ({ ComponentType: 'Paragraph' } & ParagraphProps)
  /**
   * 输入
   */
  | ({ ComponentType: 'Input' } & InputProps)
  | ({ ComponentType: 'Input.TextArea' } & TextAreaProps)
  | ({ ComponentType: 'InputNumber' } & InputNumberProps)
  | ({ ComponentType: 'Mentions' } & MentionProps)
  | ({ ComponentType: 'AutoComplete' } & AutoCompleteProps)
  /**
   * 选择
   */
  | ({ ComponentType: 'Switch' } & SwitchProps)
  | ({ ComponentType: 'Rate' } & RateProps)
  | ({ ComponentType: 'Slider' } & SliderSingleProps)
  | ({ ComponentType: 'Slider' } & SliderRangeProps)
  | ({ ComponentType: 'Radio' } & RadioProps)
  | ({ ComponentType: 'Checkbox' } & CheckboxProps)
  | ({ ComponentType: 'Cascader' } & CascaderProps)
  | ({ ComponentType: 'Select' } & SelectProps<string | number>)
  | ({ ComponentType: 'TreeSelect' } & TreeSelectProps<string | number>)
  | ({ ComponentType: 'Transfer' } & TransferProps)
  /**
   * 日期选择
   */
  | ({ ComponentType: 'DatePicker' } & DatePickerProps)
  | ({ ComponentType: 'TimePicker' } & TimePickerProps)
  | ({ ComponentType: 'RangePicker' } & RangePickerProps)
  /**
   * 上传文件
   */
  | ({ ComponentType: 'Upload' } & UploadProps)
  | ({ ComponentType: 'Upload.Dragger' } & DraggerProps)
  /**
   * 自定义组件
   */
  | { ComponentType: Function; [key: string]: any };

export type DataEntryFn<T> = (record: T, form: FormInstance<T>) => IDataEntry;

export type DataEntry<T> = IDataEntry | DataEntryFn<T>;

export type FormItemPropsFn<T> = (record: T, form: FormInstance<T>) => FormItemProps<T>;

export interface IColumnProps<T> extends ColumnProps<T> {
  /**
   * 控制检索表单中是否渲染此字段
   */
  hideInSearch?: boolean;
  /**
   * 控制当前表格中是否渲染此字段
   */
  hideInTable?: boolean;
  /**
   * 控制详情列表中是否渲染此字段
   */
  hideInList?: boolean;
  /**
   * 控制更新表单中是否渲染此字段
   */
  hideInForm?: boolean;
  /**
   * 表单布局
   */
  layout?: RecursivePartial<typeof defaultLayout>;
  /**
   * ListItem额外属性
   */
  listItemProps?: Omit<DescriptionsItemProps, 'children'>;
  /**
   * FormItem额外属性
   */
  formItemProps?: FormItemProps<T> | FormItemPropsFn<T>;
  /**
   * 输入项属性，根据type可选择antd中对应的输入组件属性
   * 也可以是自定义组件
   */
  dataEntry?: DataEntry<T>;
}

export interface ITableProps<T> extends TableProps<T> {
  columns?: IColumnProps<T>[];
  /**
   * 检索数据
   */
  onSearch?: (record: T) => void;
  /**
   * 更新数据
   */
  onUpdate?: (record: T) => void;
  /**
   * 错误处理
   */
  onError?: (record: T) => void;
  /**
   * 删除数据
   */
  onDelete?: (record: T) => void;
}

export interface IListProps<T> extends DescriptionsProps {
  columns: IColumnProps<T>[];
  record: T;
  list: any;
}

export interface IFormProps<T> extends FormProps<T> {
  columns: IColumnProps<T>[];
  record: T;
}

type WrapperWithType = ({ type: 'Drawer' } & DrawerProps) | ({ type: 'Modal' } & ModalProps);
type Wrapper = {
  view?: WrapperWithType;
  edit?: WrapperWithType;
};
type WrapperFn<T> = (record: T) => Wrapper;

export interface IUpdatableTable<T> extends ITableProps<T> {
  /**
   * 弹出表单的容器
   */
  wrapper?: Wrapper | WrapperFn<T>;
  /**
   * 检索表单属性
   */
  searchFormProps?: FormProps<T>;
  /**
   * 详情列表属性
   */
  detailListProps?: DescriptionsProps;
  /**
   * 更新表单属性
   */
  updateFormProps?: FormProps<T>;
}
