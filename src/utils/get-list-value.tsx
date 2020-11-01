import React from 'react';
import moment from 'moment';
import { __, compose, find, join, map } from 'ramda';
import { Rate, Slider, Switch, Typography } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import flatTree from './flat-tree';
import formatter from './formatter';
import ItemOfOption from './item-of-option';
import ItemToOption from './item-to-option';
import tag from './tag';
import { DataEntry } from '../advanced-table/typings';

const { Text, Link, Paragraph } = Typography;

const formatMoment = compose(formatter, moment) as (inp?: any) => string;

/**
 * 获取输入值
 * @param DI dataIndex
 * @param DE dataEntry
 * @param record
 * @param list
 */
function getValue<T>(DI: any, DE: DataEntry<T>, record: T, list: any) {
  const dataValue = record[DI];
  if (typeof dataValue === 'undefined') return null;

  const dataEntry = typeof DE === 'function' ? DE(record, list) : DE;
  // @ts-ignore
  const { ComponentType, options: opts = [], ...restProps } = dataEntry;
  const options = typeof opts === 'function' ? opts(record) : opts;

  switch (dataEntry.ComponentType) {
    /**
     * 排版
     */
    case 'Text':
      return <Text {...(restProps as any)}>{dataValue}</Text>;
    case 'Link':
      return <Link href={dataValue} {...(restProps as any)} />;
    case 'Paragraph':
      return <Paragraph {...(restProps as any)}>{dataValue}</Paragraph>;
    /**
     * 输入
     */
    case 'Input':
      return <Text {...(restProps as any)}>{dataValue}</Text>;
    case 'InputNumber':
      return dataValue;
    case 'Input.TextArea':
      return (
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
          }}
        >
          {dataValue}
        </pre>
      );
    case 'AutoComplete':
      return dataValue;
    case 'Mentions':
      return dataValue;
    /**
     * 选择
     */
    case 'Switch':
      return <Switch checked={dataValue} {...(restProps as any)} />;
    case 'Rate':
      return <Rate value={dataValue} {...(restProps as any)} />;
    case 'Slider':
      return <Slider value={dataValue} {...(restProps as any)} />;

    // find =
    case 'Radio':
      // return [dataValue].map(item => options.find(ItemOfOption(item))).map(tag);
      return compose(
        map(tag),
        map(compose(find(__ as any, options) as any, ItemOfOption)),
      )([dataValue]);
    case 'Checkbox':
      // return dataValue.map(item => options.find(ItemOfOption(item))).map(tag);
      return compose(
        map(tag),
        map(compose(find(__ as any, options) as any, ItemOfOption)),
      )(dataValue);
    case 'Cascader':
      return dataValue.map(item => flatTree(options).find(ItemOfOption(item) as any)).map(tag);
    case 'Select':
      // 单选
      // 多选
      if ((restProps as any).mode === 'multiple')
        return dataValue.map(item => options.find(ItemOfOption(item))).map(tag);
      return dataValue;
    case 'TreeSelect':
      return dataValue
        .map(item => flatTree((restProps as any).treeData).find(ItemOfOption(item) as any))
        .map(ItemToOption('title', 'value'))
        .map(tag);
    case 'Transfer':
      return dataValue
        .map(item => (restProps as any).dataSource.find(ItemOfOption(item, 'key')))
        .map(ItemToOption('title', 'key'))
        .map(tag);
    /**
     * 日期选择
     */
    case 'DatePicker':
    case 'TimePicker':
      return dataValue && formatMoment(dataValue);
    case 'RangePicker':
      return dataValue && compose(join(' ~ '), map(formatMoment))(dataValue);
    /**
     * 其他
     */
    case 'Upload':
    case 'Upload.Dragger':
      return (
        dataValue &&
        map((item: { uid: any; name: string; url: string; status: string }) => (
          <div key={item.uid}>
            <PaperClipOutlined />
            <a href={item.url} style={{ marginLeft: 8 }}>
              {item.name}
            </a>
          </div>
        ))(dataValue)
      );

    default:
      return JSON.stringify(dataValue);
  }
}

export default getValue;