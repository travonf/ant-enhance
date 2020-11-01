import React from 'react';
import { Descriptions } from 'antd';
import getValue from '../../utils/get-list-value';
import { IListProps, IColumnProps, DataEntry } from '../typings';

const ListItem = Descriptions.Item;

export const defaultDataEntry: DataEntry<any> = {
  ComponentType: 'Input',
  disabled: true,
};

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
        className="ant-enhance-advanced-table-detail-list-item"
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
