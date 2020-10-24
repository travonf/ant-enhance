import React from 'react';
import moment from 'moment';
import { __, find, join, map, compose } from 'ramda';
import { Descriptions, Rate, Switch, Slider, Typography } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { tag, flatTree, formatter, ItemOfOption, ItemToOption } from '@/utils';
import { IListProps, IColumnProps, DataEntry } from './typings';

const ListItem = Descriptions.Item;
const { Text, Link, Paragraph } = Typography;

const formatMoment = compose(formatter, moment) as (inp?: any) => string;

export const defaultDataEntry: DataEntry<any> = {
  ComponentType: 'Input',
  disabled: true,
};

/**
 * 获取输入值
 * @param DI dataIndex
 * @param DE dataEntry
 */
function getValue<T>(DI: any, DE: DataEntry<T>, record: T, list: any) {
  const dataValue = record[DI];
  if (typeof dataValue === 'undefined') return null;

  const dataEntry = typeof DE === 'function' ? DE(record, list) : DE;
  const { ComponentType, options: opts = [], ...restProps } = dataEntry;
  const options = typeof opts === 'function' ? opts(record) : opts;
  switch (ComponentType) {
    /**
     * 排版
     */
    case 'Text':
      return <Text {...restProps}>{dataValue}</Text>;
    case 'Link':
      return <Link href={dataValue} {...restProps} />;
    case 'Paragraph':
      return <Paragraph {...restProps}>{dataValue}</Paragraph>;
    /**
     * 输入
     */
    case 'Input':
      return <Text {...restProps}>{dataValue}</Text>;
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
      return <Switch checked={dataValue} {...restProps} />;
    case 'Rate':
      return <Rate value={dataValue} {...restProps} />;
    case 'Slider':
      return <Slider value={dataValue} {...restProps} />;

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
      if (restProps.mode === 'multiple')
        return dataValue.map(item => options.find(ItemOfOption(item))).map(tag);
      return dataValue;
    case 'TreeSelect':
      return dataValue
        .map(item => flatTree(restProps.treeData).find(ItemOfOption(item) as any))
        .map(ItemToOption('title', 'value'))
        .map(tag);
    case 'Transfer':
      return dataValue
        .map(item => restProps.dataSource.find(ItemOfOption(item, 'key')))
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

function DetailList<IRecord extends object = {}>(props: IListProps<IRecord>) {
  const { list, columns = [], record = {} as IRecord, ...restProps } = props;

  const renderListItem = (column: IColumnProps<IRecord>) => {
    const {
      title,
      dataIndex,
      dataEntry = defaultDataEntry,
      listItemProps,
      hideInList = false,
    } = column;

    if (hideInList) return null;

    return (
      <ListItem
        key={title as any}
        label={title}
        className="ant-enhance-updatable-table-detail-list-item"
        {...listItemProps}
      >
        {getValue(dataIndex, dataEntry, record, list)}
      </ListItem>
    );
  };

  return (
    <Descriptions
      bordered
      column={{
        xs: 0x01,
        sm: 0x01,
        md: 0x02,
        lg: 0x02,
        xl: 0x02,
        xxl: 0x04,
      }}
      layout="horizontal"
      {...restProps}
    >
      {columns.map(renderListItem)}
    </Descriptions>
  );
}

export default DetailList;
