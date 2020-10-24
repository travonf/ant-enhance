import moment, { Moment } from 'moment';

function formatter(val: string | number | Moment): string {
  if (val instanceof moment) {
    return (val as Moment).format('YYYY-MM-DD HH:mm:ss');
  }
  return val as string;
}

export default formatter;
