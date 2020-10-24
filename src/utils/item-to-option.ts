/**
 * 其他类型映射为Option
 */
function itemToOption<Option>(
  label: string = 'label',
  value: string = 'value',
): (item: any) => Option {
  return (item: any) => ({
    label: item[label],
    value: item[value],
    ...item,
  });
}

export default itemToOption;
