import moment from 'moment';
import localize from './localize';

const a = { a: 123 };
const b = { b: 'b' };

const c = { c: moment('2020-01-01 07:59:59') };
const d = { c: '2020-01-01 07:59:59' };

const e = { e: [moment('2020-01-01 07:59:59'), moment('2020-01-01 17:59:59')] };
const f = { e: ['2020-01-01 07:59:59', '2020-01-01 17:59:59'] };

describe('测试localize功能', () => {
  it('数字对象不用改', () => {
    expect(localize(a)).toEqual(a);
  });
  it('文本对象不用改', () => {
    expect(localize(b)).toEqual(b);
  });
  it('时间对象序列化', () => {
    expect(localize(c)).toEqual(d);
  });
  it('时间数组序列化', () => {
    expect(localize(e)).toEqual(f);
  });
});
