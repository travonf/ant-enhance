import { TDataEntry } from './typings';

function InitialValue(dataEntry: TDataEntry) {
  const { type, mode } = dataEntry || {};
  switch (type) {
    case 'AutoComplete':
    case 'Input':
    case 'InputNumber':
    case 'Mentions':
    case 'Rate':
    case 'Slider':
    case 'Upload':
    case 'Switch':
    case 'Radio':
    case 'Checkbox':
    case 'Select':
    case 'Cascader':
    case 'TreeSelect':
    case 'Transfer':
    case 'DatePicker':
      return undefined;
    case 'DatePicker.RangePicker':
      return [undefined, undefined];
    case 'TimePicker':
      return undefined;
    case 'SearchPerson':
      if (mode === 'multiple') return [];
      return undefined;
    default:
      return undefined;
  }
}

export default InitialValue;
