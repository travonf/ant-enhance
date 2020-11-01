/**
 * Col布局属性
 */
export const colLayout = {
  xs: 0x18, // 屏幕 < 576px  微型尺寸下单列
  sm: 0x18, // 屏幕 ≥ 576px  小型尺寸下单列
  md: 0x18, // 屏幕 ≥ 768px  中型尺寸下单列
  lg: 0x0c, // 屏幕 ≥ 992px  大型尺寸下双列
  xl: 0x0c, // 屏幕 ≥ 1200px 超大尺寸下双列
};

/**
 * FormItem布局属性
 */
export const formItemLayout = {
  labelCol: {
    // xs: { span: 0x18 },
    sm: { span: 0x18 }, // 小型尺寸下单列垂直布局
    md: { span: 0x0c }, // 中型尺寸下单列水平布局
    lg: { span: 0x18 }, // 大型尺寸下双列垂直布局
    xl: { span: 0x04 }, // 超大尺寸下双列水平布局
  },
  wrapperCol: {
    // xs: { span: 0x18 },
    sm: { span: 0x18 },
    md: { span: 0x13 },
    lg: { span: 0x18 },
    xl: { span: 0x13 },
  },
};

export const defaultLayout = {
  col: colLayout,
  formItem: formItemLayout,
};
