import mockjs from 'mockjs';

const resp = mockjs.mock({
  code: 200,
  'data|3-9': [
    {
      id: '@increment',
      Text: '@title',
      Link: '@url',
      Paragraph: '@paragraph',
      TextArea: '@sentence()\n@sentence()',
      Input: '@title',
      InputNumber: '@integer(0, 100)',
      AutoComplete: '@word',
      Switch: '@boolean',
      Rate: '@integer(0, 5)',
      Slider: '@integer(0, 100)',
      'Radio|1': ['1', '2', '3', '4', '5'],
      Checkbox: ['1', '2', '3', '4', '5'],
      Mentions: '@word',
      Select: ['1', '2', '3'],
      Cascader: ['1', '1-1', '1-1-1'],
      TreeSelect: ['1', '1-1', '1-1-1'],
      Transfer: ['1', '3', '5'],
      DatePicker: '@datetime',
      YearPicker: '@datetime',
      QuarterPicker: '@datetime',
      MonthPicker: '@datetime',
      WeekPicker: '@datetime',
      TimePicker: '@datetime',
      DateRangePicker: ['@datetime', '@datetime'],
      TimeRangePicker: ['@datetime', '@datetime'],
      'Upload|1-2': [
        {
          uid: '@guid',
          name: '@title',
          'status|1': ['uploading', 'done', 'error', 'removed'],
          url: '@url',
        },
      ],
      'Dragger|1-2': [
        {
          uid: '@guid',
          name: '@title',
          'status|1': ['uploading', 'done', 'error', 'removed'],
          url: '@url',
        },
      ],
    },
  ],
  mesg: '[模拟]数据获取成功',
});

export async function getData(params = {}) {
  return resp;
}
