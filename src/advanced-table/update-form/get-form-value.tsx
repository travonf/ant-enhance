import React from 'react';
import moment from 'moment';
import { __, compose, find, join, map, path } from 'ramda';
import { source } from '../profile';
import { DataEntry } from '../typings';

/**
 * 获取输入值
 * @param DI dataIndex
 * @param DE dataEntry
 * @param record
 * @param form
 */
function getValue<T>(DI: any, DE: DataEntry<T>, record: T, form: any) {
  const dataValue = path<any>(Array.isArray(DI) ? DI : [DI])(record);
  const dataEntry = typeof DE === 'function' ? DE(record, form!, source.update_form) : DE;
  switch (dataEntry.ComponentType) {
    /**
     * 排版
     */
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
      return dataValue && map(moment)(dataValue);
    /**
     * 其他
     */
    default:
      return dataValue;
  }
}

export default getValue;
