import React, { useEffect } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  AutoComplete,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Rate,
  Radio,
  Switch,
  Slider,
  Cascader,
  Select,
  TreeSelect,
  Transfer,
  TimePicker,
  Typography,
  Upload,
} from 'antd';
import { omit } from '@/utils';
import { defaultLayout } from './layouts';
import { IFormProps, IColumnProps, DataEntry, Option } from './typings';

const FormItem = Form.Item;
const { Text, Link, Paragraph } = Typography;

export const itemToMention = ({ label, value, disabled = false }: Option) => (
  <Mentions.Option key={value} value={value} disabled={disabled}>
    {label}
  </Mentions.Option>
);
export const itemToRadio = ({ label, value, disabled = false }: Option) => (
  <Radio key={value} value={value} disabled={disabled}>
    {label}
  </Radio>
);
export const itemToSelect = ({ label, value, disabled = false }: Option) => (
  <Select.Option key={value} value={value} disabled={disabled}>
    {label}
  </Select.Option>
);
export const defaultDataEntry: DataEntry<any> = {
  ComponentType: 'Input',
  disabled: true,
};

/**
 * 获取输入组件
 * @param DI dataIndex
 * @param DE dataEntry
 */
function getInput<T>(DI: any, DE: DataEntry<T>, record: T, form: any) {
  const dataEntry = typeof DE === 'function' ? DE(record, form!) : DE;
  const { ComponentType, options: opts = [], ...restProps } = dataEntry;
  const options = typeof opts === 'function' ? opts(record) : opts;

  /**
   * 支持传入一个组件
   * 组件必须受控
   * value（或 valuePropName 指定的其他属性）
   * onChange（或 trigger 指定的其他属性）
   */
  // ComponentType.prototype.isReactComponent
  if (typeof ComponentType === 'function') {
    return <ComponentType {...restProps} />;
  }

  switch (ComponentType) {
    /**
     * 排版
     */
    case 'Text':
      return <Text {...restProps} />;
    case 'Link':
      return <Link {...restProps} />;
    case 'Paragraph':
      return <Paragraph {...restProps} />;
    /**
     * 输入
     */
    case 'Input':
      return <Input {...restProps} />;
    case 'InputNumber':
      return <InputNumber {...restProps} />;
    case 'Input.TextArea':
      return <Input.TextArea {...restProps} />;
    case 'AutoComplete':
      return <AutoComplete options={options} {...restProps} />;
    case 'Mentions':
      return <Mentions {...restProps}>{options.map(itemToMention)}</Mentions>;
    /**
     * 选择
     */
    case 'Switch':
      return <Switch {...restProps} />;
    case 'Rate':
      return <Rate {...restProps} />;
    case 'Slider':
      return <Slider {...restProps} />;

    case 'Radio':
      return <Radio.Group options={options} {...restProps} />;
    case 'Checkbox':
      return <Checkbox.Group options={options} {...restProps} />;
    case 'Cascader':
      return <Cascader options={options} {...restProps} />;
    case 'Select':
      return <Select {...restProps}>{options.map(itemToSelect)}</Select>;
    case 'TreeSelect':
      return <TreeSelect {...restProps} />;
    case 'Transfer':
      return <Transfer {...restProps} />;
    /**
     * 日期选择
     */
    case 'DatePicker':
      return <DatePicker {...restProps} />;
    case 'TimePicker':
      return <TimePicker {...restProps} />;
    case 'RangePicker':
      return <DatePicker.RangePicker {...restProps} />;
    /**
     * 其他
     */
    case 'Upload':
      return <Upload {...restProps} />;
    case 'Upload.Dragger':
      return <Upload.Dragger {...restProps} />;

    default:
      return <Text {...restProps} />;
  }
}

/**
 * 获取输入值
 * @param DI dataIndex
 * @param DE dataEntry
 */
function getValue<T>(DI: any, DE: DataEntry<T>, record: T, form: any) {
  const dataValue = record[DI];
  const dataEntry = typeof DE === 'function' ? DE(record, form!) : DE;
  const { ComponentType } = dataEntry;
  switch (ComponentType) {
    /**
     * 输入
     */
    /**
     * 选择
     */
    /**
     * 日期选择
     */
    case 'DatePicker':
    case 'TimePicker':
      return dataValue && moment(dataValue);
    case 'RangePicker':
      return dataValue && dataValue.map((item: string) => moment(item));
    default:
      return dataValue;
  }
}

function UpdateForm<IRecord extends object = {}>(props: IFormProps<IRecord>) {
  const { form, columns = [], record = {} as IRecord, ...restProps } = props;

  useEffect(() => {
    const keys = Object.keys(form?.getFieldsValue() || {});
    const values = {} as any;
    function setValue({ dataIndex, dataEntry = defaultDataEntry }: any) {
      if (dataIndex && keys.includes(dataIndex))
        values[dataIndex] = getValue(dataIndex, dataEntry, record, form);
    }
    columns.forEach(setValue);
    form?.setFieldsValue(values);
  }, [record]);

  const renderFormItem = (column: IColumnProps<IRecord>) => {
    const {
      title,
      dataIndex,
      dataEntry = defaultDataEntry,
      layout: userLayout,
      formItemProps: userFormItemProps = {},
      hideInForm = false,
    } = column;

    if (hideInForm) return null;

    const layout = { ...defaultLayout, ...userLayout };

    const userFormItemPropsFn =
      typeof userFormItemProps === 'function' ? userFormItemProps : () => userFormItemProps;

    const { shouldUpdate, dependencies } = userFormItemPropsFn(record, form!);

    const formItemProps = () => ({
      label: title,
      name: dataIndex,
      rules: [{ required: true, message: `${title}是必填项!` }],
      ...omit(userFormItemPropsFn(record, form!), ['shouldUpdate', 'dependencies']),
    });

    const formItem = () => (
      <FormItem {...layout.formItem} {...formItemProps()}>
        {getInput(dataIndex, dataEntry, record, form)}
      </FormItem>
    );

    return (
      <Col key={String(dataIndex)} {...layout.col}>
        {!!shouldUpdate || !!dependencies ? (
          <FormItem
            style={{ marginBottom: 0 }}
            shouldUpdate={shouldUpdate}
            dependencies={dependencies}
          >
            {formItem}
          </FormItem>
        ) : (
          formItem()
        )}
      </Col>
    );
  };

  return (
    <Form form={form} name="form_in_wrapper" {...restProps}>
      <Row gutter={0x10}>{columns.map(renderFormItem)}</Row>
    </Form>
  );
}

export default UpdateForm;
