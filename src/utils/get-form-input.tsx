import React from 'react';
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Typography,
  Upload,
} from 'antd';
import omit from './omit';
import ItemToMention from './item-to-mention';
import ItemToSelect from './item-to-select';
import { DataEntry } from '../advanced-table/typings';

const { Text, Link, Paragraph } = Typography;

/**
 * 获取输入组件
 * @param DI dataIndex
 * @param DE dataEntry
 * @param record
 * @param form
 */
function getInput<T>(DI: any, DE: DataEntry<T>, record: T, form: any) {
  const dataEntry = typeof DE === 'function' ? DE(record, form!) : DE;
  // @ts-ignore
  const { ComponentType, options: opts = [] } = dataEntry;
  const restProps = omit(dataEntry, ['ComponentType']);
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

  switch (dataEntry.ComponentType) {
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
      return <AutoComplete {...restProps} options={options} />;
    case 'Mentions':
      return <Mentions {...restProps}>{options.map(ItemToMention)}</Mentions>;
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
      return <Radio.Group {...restProps} options={options} />;
    case 'Checkbox':
      return <Checkbox.Group {...restProps} options={options} />;
    case 'Cascader':
      return <Cascader {...restProps} options={options} />;
    case 'Select':
      return <Select {...restProps}>{options.map(ItemToSelect)}</Select>;
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

export default getInput;
