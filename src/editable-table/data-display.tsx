import React from 'react';
import moment from 'moment';
import { Tag } from 'antd';
import { TMomentFmt, IDataProps, IOption } from './typings';

const momentFmt: TMomentFmt = format => value => moment(value, format).isValid() ? moment(value, format).format(format) : null; // prettier-ignore

function Tags(props: any) {
  const { value } = props;
  return value.map((item: any) => (
    <Tag key={item} color="blue">
      {item}
    </Tag>
  ));
}

function DataDisplay(props: IDataProps) {
  const { value = null, record, dataEntry: de = {} } = props;
  const dataEntry = typeof de === 'function' ? de(value, record) : de;
  const { type, options: opts = [], separator = '~' } = dataEntry as any;

  const options: IOption[] = typeof opts === 'function' ? opts(value, record) : opts;

  switch (type) {
    case 'AutoComplete':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'Input':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'InputNumber':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'Mentions':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'Rate':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'Slider':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'Upload':
      return (
        <div className="fieldWrap">
          <div className="field">{JSON.stringify(value)}</div>
        </div>
      );

    case 'Switch':
      return (
        <div className="fieldWrap">
          <div className="field">{value ? '是' : '否'}</div>
        </div>
      );

    case 'Radio':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'Checkbox':
      return (
        <div className="fieldWrap">
          <div className="field">
            <Tags value={value} />
          </div>
        </div>
      );

    case 'Select':
      return (
        <div className="fieldWrap">
          <div className="field">
            {
              (
                (options || []).find(item => item.value === value) || {
                  label: value,
                  value,
                }
              ).label
            }
          </div>
        </div>
      );

    case 'Cascader':
      return <Tags value={value} />;

    case 'TreeSelect':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'Transfer':
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );

    case 'DatePicker':
      return (
        <div className="fieldWrap">
          <div className="field">{momentFmt('YYYY-MM-DD')(value)}</div>
        </div>
      );

    case 'DatePicker.RangePicker':
      return (
        <div className="fieldWrap">
          <div className="field">
            {(value || []).map(momentFmt('YYYY-MM-DD')).join(` ${separator} `)}
          </div>
        </div>
      );

    case 'TimePicker':
      return (
        <div className="fieldWrap">
          <div className="field">{momentFmt('HH:mm:ss')(value)}</div>
        </div>
      );

    default:
      return (
        <div className="fieldWrap">
          <div className="field">{value}</div>
        </div>
      );
  }
}

export default DataDisplay;
