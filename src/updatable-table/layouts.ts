/**
 * Col布局属性
 * 默认情况为单列布局
 */
export const defaultColLayout = {
  xs: 0x18,
  sm: 0x18,
  md: 0x18,
  lg: 0x18,
  xl: 0x18,
};

/**
 * FormItem布局属性
 */
export const defaultformItemLayout = {
  labelCol: {
    xs: { span: 0x18 },
    sm: { span: 0x18 },
    md: { span: 0x18 },
    lg: { span: 0x18 },
    xl: { span: 0x04 },
  },
  wrapperCol: {
    xs: { span: 0x18 },
    sm: { span: 0x18 },
    md: { span: 0x18 },
    lg: { span: 0x18 },
    xl: { span: 0x13 },
  },
};

export const defaultLayout = {
  col: defaultColLayout,
  formItem: defaultformItemLayout,
};
