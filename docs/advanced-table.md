---
order: 2
---

# 高级表格

## 简介

通过在 antd Table 的基础上扩展了一些属性，附带一个编辑功能的弹出表单，从而简化用户代码编写。

> 注：你需要自己管理数据源的获取，即受控模式。  
> dataSource 数据源  
> onUpdate 表单提交后回调函数

## 特性

- 兼容 antd 全部的数据录入组件
- 全面拥抱 typescript，支持类型定义，极大的提升了开发体验
- 高度可配置化，包括静态配置，动态配置
  - 表单联动，某个字段改变控制其他字段变化
- 自动处理数据，无需手动序列化 moment 格式的日期

## 演示

<code src="../example/advanced-table/FullDisplay.tsx" title="能力展示" />

### 基本用法

<code src="../example/advanced-table/Basic.tsx" title="基本用法" />

### 字段嵌套

<code src="../example/advanced-table/NestedFields.tsx" title="字段嵌套" />

### 表单容器

<code src="../example/advanced-table/Wrapper.tsx" title="表单容器" />

### 表单布局

<code src="../example/advanced-table/Layout.tsx" title="自定义布局" />

### 表单联动

自定义 dataEntry 属性，支持函数式写法，签名为

```typescript
(record: IRecord, form: FormInstance<IRecord>) => IDataEntry;
```

#### 主动联动

<code src="../example/advanced-table/Advanced1.tsx" title="主动联动" />

#### 被动联动

<code src="../example/advanced-table/Advanced2.tsx" title="被动联动" />
