# 简介

通过在 antd Table 的基础上扩展了一些属性，附带一个编辑功能的弹出表单，从而简化用户代码编写。你需要自己管理数据源的获取

## 特性

- 兼容 antd 全部的数据录入组件
- 全面拥抱 typescript，支持类型定义，极大的提升了开发体验
- 高度可配置化，包括静态配置，动态配置（通过控制反转实现）
  - 表单联动，某个字段改变控制其他字段变化
- 自动处理数据，无需手动序列化 moment 格式的日期

## 安装

```shell
$ npm i ant-enhance -S
# or
$ yarn add ant-enhance
```

## 使用

<code src="../example/updatable-table/FullDisplay.tsx" title="能力展示" />

## 配置

以下只列出与 antd Table 不同的属性，其余的参考 antd 官方文档

### Table

```typescript
wrapper?: {
  type?: 'Drawer' | 'Modal';
  title?: any;
  width?: any;
}
```

### Column

```typescript
/**
 * 是否渲染
 */
hideInTable?: boolean;
hideInForm?: boolean;
/**
 * 布局
 */
layout?: {
   col: {},
   formItem: { labelCol: {}, wrapperCol: {} }
};
/**
 * 额外属性
 */
formItemProps?: FormItemProps
/**
 * 核心属性
 * 弹出表单根据此配置渲染输入组件
 */
dataEntry?: DataEntry | DataEntryFn<T>;
```
