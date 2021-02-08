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
import { RadioGroupProps } from 'antd/es/radio';
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
import { source } from './profile';

export type ValueOf<T> = T[keyof T];

type Source = ValueOf<typeof source>;

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Record<string, any>
    ? RecursivePartial<T[P]>
    : T[P];
};

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  color?: string;
}

type TextPropsWithType = { ComponentType: 'Text' } & TextProps;
type LinkPropsWithType = { ComponentType: 'Link' } & LinkProps;
type ParagraphPropsWithType = { ComponentType: 'Paragraph' } & ParagraphProps;

type InputPropsWithType = { ComponentType: 'Input' } & InputProps;
type TextAreaPropsWithType = { ComponentType: 'Input.TextArea' } & TextAreaProps;
type InputNumberPropsWithType = { ComponentType: 'InputNumber' } & InputNumberProps;
type MentionPropsWithType = { ComponentType: 'Mentions' } & MentionProps;
type AutoCompletePropsWithType = { ComponentType: 'AutoComplete' } & AutoCompleteProps;

type SwitchPropsWithType = { ComponentType: 'Switch' } & SwitchProps;
type RatePropsWithType = { ComponentType: 'Rate' } & RateProps;
type SliderSinglePropsWithType = { ComponentType: 'Slider' } & SliderSingleProps;
type SliderRangePropsWithType = { ComponentType: 'Slider' } & SliderRangeProps;
type RadioPropsWithType = { ComponentType: 'Radio' } & RadioGroupProps;
type CheckboxPropsWithType = { ComponentType: 'Checkbox' } & CheckboxProps;
type CascaderPropsWithType = { ComponentType: 'Cascader' } & CascaderProps;
type SelectPropsWithType = { ComponentType: 'Select' } & SelectProps<string | number>;
type TreeSelectPropsWithType = { ComponentType: 'TreeSelect' } & TreeSelectProps<string | number>;
type TransferPropsWithType<T> = { ComponentType: 'Transfer' } & TransferProps<T>;

type DatePickerPropsWithType = { ComponentType: 'DatePicker' } & DatePickerProps;
type TimePickerPropsWithType = { ComponentType: 'TimePicker' } & TimePickerProps;
type RangePickerPropsWithType = { ComponentType: 'RangePicker' } & RangePickerProps;

type UploadPropsWithType = { ComponentType: 'Upload' } & UploadProps;
type DraggerPropsWithType = { ComponentType: 'Upload.Dragger' } & DraggerProps;

type ComponentPropsWithType = { ComponentType: Function; [key: string]: any };
/**
 * antd中全部输入组件的名称
 * https://ant.design/components/overview-cn/#数据录入
 */
export type IDataEntry<T> =
  /**
   * 排版
   */
  | TextPropsWithType
  | LinkPropsWithType
  | ParagraphPropsWithType
  /**
   * 输入
   */
  | InputPropsWithType
  | TextAreaPropsWithType
  | InputNumberPropsWithType
  | MentionPropsWithType
  | AutoCompletePropsWithType
  /**
   * 选择
   */
  | SwitchPropsWithType
  | RatePropsWithType
  | SliderSinglePropsWithType
  | SliderRangePropsWithType
  | RadioPropsWithType
  | CheckboxPropsWithType
  | CascaderPropsWithType
  | SelectPropsWithType
  | TreeSelectPropsWithType
  | TransferPropsWithType<T>
  /**
   * 日期选择
   */
  | DatePickerPropsWithType
  | TimePickerPropsWithType
  | RangePickerPropsWithType
  /**
   * 上传文件
   */
  | UploadPropsWithType
  | DraggerPropsWithType
  /**
   * 自定义组件
   */
  | ComponentPropsWithType;

export type DataEntryFn<T> = (record: T, form: FormInstance<T>, source: Source) => IDataEntry<T>;

export type DataEntry<T> = IDataEntry<T> | DataEntryFn<T>;

export interface IFormItemProps<T> extends FormItemProps<T> {
  order?: number;
}

export type FormItemPropsFn<T> = (record: T, form: FormInstance<T>) => IFormItemProps<T>;

export interface IColumnProps<T> extends ColumnProps<T> {
  /**
   * 控制当前表格中是否渲染此字段
   */
  hideInSearchList?: boolean;

  /**
   * 控制检索表单中是否渲染此字段
   */
  hideInSearchForm?: boolean;

  /**
   * 控制录入表单中是否渲染此字段
   */
  hideInSubmitForm?: boolean;

  /**
   * 控制详情列表中是否渲染此字段
   */
  hideInDetailList?: boolean;

  /**
   * 控制更新表单中是否渲染此字段
   */
  hideInUpdateForm?: boolean;

  /**
   * 表单布局
   */
  layout?: RecursivePartial<typeof defaultLayout>;

  /**
   * SearchFormItem额外属性
   */
  searchFormItemProps?: IFormItemProps<T> | FormItemPropsFn<T>;

  /**
   * SubmitFormItem额外属性
   */
  submitFormItemProps?: IFormItemProps<T> | FormItemPropsFn<T>;

  /**
   * DetailListItem额外属性
   */
  detailListItemProps?: Omit<DescriptionsItemProps, 'children'>;

  /**
   * UpdateFormItem额外属性
   */
  updateFormItemProps?: IFormItemProps<T> | FormItemPropsFn<T>;

  /**
   * 输入项属性，根据type可选择antd中对应的输入组件属性
   * 也可以是自定义组件
   */
  dataEntry?: DataEntry<T>;
}

/**
 * 检索表格
 */
export interface ISearchList<T> extends TableProps<T> {
  columns?: IColumnProps<T>[];
}

/**
 * 检索表单
 */
export interface ISearchForm<T> extends FormProps<T> {
  columns: IColumnProps<T>[];
  record: T;
  retrieving: boolean;
  defaultExpandCount?: number;
}

/**
 * 详情列表
 */
export interface IDetailList<T> extends DescriptionsProps {
  columns: IColumnProps<T>[];
  record: T;
  list: any;
}

/**
 * 录入表单
 */
export interface ISubmitForm<T> extends FormProps<T> {
  columns: IColumnProps<T>[];
  record: T;
}

/**
 * 更新表单
 */
export interface IUpdateForm<T> extends FormProps<T> {
  columns: IColumnProps<T>[];
  record: T;
}

type WrapperWithType = ({ type: 'Drawer' } & DrawerProps) | ({ type: 'Modal' } & ModalProps);

type Wrapper = {
  plus?: WrapperWithType;
  view?: WrapperWithType;
  edit?: WrapperWithType;
};

type WrapperFn<T> = (record: T) => Wrapper;

export interface Toolbar {
  /**
   * 工具栏标题
   */
  title?: React.ReactNode;
  actions?: false | any[];
  settings?: {
    reload?: boolean;
    import?: boolean;
    export?: boolean;
    density?: boolean;
    setting?: boolean;
    fullscreen?: boolean;
  };
}

export interface IAdvancedTable<T> extends ISearchList<T> {
  /**
   * 工具栏
   */
  toolbar?: false | Toolbar;

  /**
   * 弹出表单的容器
   */
  wrapper?: Wrapper | WrapperFn<T>;

  /**
   * 弹框显示回调
   */
  onWrapperShow?: (type: 'plus' | 'view' | 'edit', record: T) => void;

  /**
   * 弹框隐藏回调
   */
  onWrapperHide?: (type: 'plus' | 'view' | 'edit', record: T) => void;

  /**
   * 检索表单属性
   */
  searchForm?: { defaultExpandCount?: number } & FormProps<T>;

  /**
   * 录入表单属性
   */
  submitForm?: FormProps<T>;

  /**
   * 详情列表属性
   */
  detailList?: DescriptionsProps;

  /**
   * 更新表单属性
   */
  updateForm?: FormProps<T>;

  /**
   * 导入操作
   */
  onImport?: Function;

  /**
   * 导出操作
   */
  onExport?: Function;

  /**
   * 检索数据
   */
  onSearch?: (record: T) => void;

  /**
   * 录入数据
   */
  onSubmit?: (record: T) => void;

  /**
   * 获取详情
   */
  onDetail?: (record: T) => void;

  /**
   * 更新数据
   */
  onUpdate?: (record: T) => void;

  /**
   * 删除数据
   */
  onDelete?: (record: T) => void;
}
