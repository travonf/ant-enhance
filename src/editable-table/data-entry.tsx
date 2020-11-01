import React from 'react';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
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
  Upload,
} from 'antd';
import { TItem2Option, TMomentVld, IDataProps, IOption } from './typings';

const item2mo: TItem2Option = ({ label, value }) => <Mentions.Option key={value} value={value}>{label}</Mentions.Option>; // prettier-ignore
const item2so: TItem2Option = ({ label, value }) => <Select.Option key={value} value={value}>{label}</Select.Option>; // prettier-ignore

const momentVld: TMomentVld = format => value => moment(value, format).isValid() ? moment(value, format) : undefined; // prettier-ignore

function DataEntry(props: IDataProps) {
  const {
    value,
    record,
    rowKey,
    field,
    dataEntry: de = {} as any,
    relationships: rls = [],
    onChange,
  } = props;

  const dataEntry = typeof de === 'function' ? de(value, record) : de;

  const {
    disabled = false,
    type,
    allOption = true,
    options: opts = [],
    ...restEntryProps
  } = dataEntry as any;

  const relationships = typeof rls === 'function' ? rls(value, record) : rls;
  const options: IOption[] = typeof opts === 'function' ? opts(value, record) : opts;

  switch (type) {
    case 'AutoComplete':
      return (
        <AutoComplete
          disabled={disabled}
          value={value}
          dataSource={options.map((item: any) => ({
            text: item.label,
            value: item.value,
          }))}
          {...restEntryProps}
          onChange={v => onChange(v, rowKey, field, relationships)}
        />
      );

    case 'Input':
      return (
        <Input
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={e => onChange(e, rowKey, field, relationships)}
        />
      );

    case 'InputNumber':
      return (
        <InputNumber
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={v => onChange(v, rowKey, field, relationships)}
        />
      );

    case 'Input.TextArea':
      return (
        <Input.TextArea
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={e => onChange(e, rowKey, field, relationships)}
        />
      );

    case 'Mentions':
      return (
        <Mentions
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={v => onChange(v, rowKey, field, relationships)}
        >
          {options.map(item2mo)}
        </Mentions>
      );

    case 'Rate':
      return (
        <Rate
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={v => onChange(v, rowKey, field, relationships)}
        />
      );

    case 'Slider':
      return (
        <Slider
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={(v: [number, number]) => onChange(v, rowKey, field, relationships)}
        />
      );

    case 'Upload':
      return (
        <Upload
          disabled={disabled}
          fileList={value}
          {...restEntryProps}
          // onChange={(f, l, e) => onChange(e, rowKey, field, relationships)}
        >
          <Button icon={<UploadOutlined />}> Click to Upload</Button>
        </Upload>
      );

    case 'Switch':
      return (
        <Switch
          checked={value}
          {...restEntryProps}
          onChange={(c, e) => onChange(e, rowKey, field, relationships)}
        />
      );

    case 'Radio':
      return (
        <Radio.Group
          disabled={disabled}
          value={value}
          options={options}
          {...restEntryProps}
          onChange={e => onChange(e, rowKey, field, relationships)}
        />
      );

    case 'Checkbox':
      return (
        <Checkbox.Group
          disabled={disabled}
          value={value}
          options={options}
          {...restEntryProps}
          onChange={v => onChange(v, rowKey, field, relationships)}
        />
      );

    case 'Select':
      // console.debug(options);
      return (
        <Select
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={(v: any, o: any) => onChange(v, rowKey, field, relationships)}
        >
          {allOption && (
            <Select.Option key="__ALL__" value="__ALL__">
              全选项
            </Select.Option>
          )}
          {options.map(item2so)}
        </Select>
      );

    case 'Cascader':
      return (
        <Cascader
          disabled={disabled}
          value={value}
          options={options}
          {...restEntryProps}
          onChange={(v, o) => onChange(v, rowKey, field, relationships)}
        />
      );

    case 'TreeSelect':
      return (
        <TreeSelect
          disabled={disabled}
          value={value}
          {...restEntryProps}
          onChange={(v, l, e) => onChange(e, rowKey, field, relationships)}
        />
      );

    case 'Transfer':
      return (
        <Transfer
          disabled={disabled}
          // value={value}
          {...restEntryProps}
          onChange={(k, d, m) => onChange(k, rowKey, field, relationships)}
        />
      );

    case 'DatePicker':
      return (
        <DatePicker
          disabled={disabled}
          value={momentVld('YYYY-MM-DD')(value)}
          {...restEntryProps}
          onChange={(m, s) => onChange(s, rowKey, field, relationships)}
        />
      );

    case 'DatePicker.RangePicker':
      return (
        <DatePicker.RangePicker
          disabled={disabled}
          value={(value || []).map(momentVld('YYYY-MM-DD'))}
          {...restEntryProps}
          onChange={(m, s) => onChange(s, rowKey, field, relationships)}
        />
      );

    case 'TimePicker':
      return (
        <TimePicker
          disabled={disabled}
          value={momentVld('HH:mm:ss')(value)}
          {...restEntryProps}
          onChange={(m, s) => onChange(s, rowKey, field, relationships)}
        />
      );

    default:
      return null;
  }
}

export default DataEntry;
