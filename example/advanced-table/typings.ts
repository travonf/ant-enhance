export interface Upload {
  uid: number;
  name: string;
  status: string;
  url: string;
}

export interface IRecord {
  id: number;
  Text: string;
  Link: string;
  Paragraph: string;
  TextArea: string;
  Input: string;
  InputNumber: number;
  AutoComplete: string;
  Switch: number;
  Rate: number;
  Slider: number;
  Radio: string;
  Checkbox: string[];
  Mentions: string;
  Cascader: string[];
  Select: string[];
  TreeSelect: string[];
  Transfer: string[];
  DatePicker: string;
  YearPicker: string;
  QuarterPicker: string;
  MonthPicker: string;
  WeekPicker: string;
  DateRangePicker: string[];
  TimeRangePicker: string[];
  TimePicker: string;
  Upload: Upload[];
  Dragger: Upload[];
}
