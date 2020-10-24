/**
 * 从option中查找item
 */
function itemOfOption<Option>(
  value: string,
  valueProp: string = 'value',
): (option: Option) => boolean {
  return (option: Option) => option[valueProp] === value;
}

export default itemOfOption;
