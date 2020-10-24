import moment, { Moment } from 'moment';
import formatter from './formatter';

interface Type {
  [key: string]: Type | Moment | string | number | Moment[] | string[] | number[];
}

/**
 * 将moment类型数据格式化，防止出现时区偏移的情况
 * @param obj
 */
function localize(obj: Type): Type {
  if (!obj) return obj;

  const out = {} as Type;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, val] of Object.entries(obj)) {
    if (val instanceof moment) {
      // 如果是moment则格式化
      out[key] = formatter(val as Moment);
    } else if (Object.prototype.toString.call(val) === '[object Object]') {
      // 如果是对象则深度递归
      out[key] = localize(val as Type);
    } else if (Object.prototype.toString.call(val) === '[object Array]') {
      // 如果是数组则map格式化
      out[key] = (val as any[]).map(formatter);
    } else {
      // 否则直接赋值
      out[key] = val;
    }
  }

  return out;
}

export default localize;
