# 快速开始

可更新表格 updatable-table

## 简介

通过在 antd Table 的基础上扩展了一些属性，附带一个编辑功能的弹出表单，从而简化用户代码编写。

> 注：你需要自己管理数据源的获取，即受控模式。  
> dataSource 数据源  
> onUpdate 表单提交后回调函数

## 基本用法

<code src="../example/updatable-table/Basic.tsx" title="基本用法" />

## 表单容器

<code src="../example/updatable-table/Wrapper.tsx" title="表单容器" />

## 表单布局

<code src="../example/updatable-table/Layout.tsx" title="自定义布局" />

## 表单联动

自定义 dataEntry 属性，支持函数式写法，签名为

```typescript
(record: IRecord, form: FormInstance<IRecord>) => IDataEntry;
```

### 主动联动

<code src="../example/updatable-table/Advanced1.tsx" title="主动联动" />

### 被动联动

<code src="../example/updatable-table/Advanced2.tsx" title="被动联动" />
