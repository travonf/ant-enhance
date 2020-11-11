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

## 配置

以下只列出与 antd Table 不同的属性，其余的参考 antd 官方文档

### Table

```typescript
/**
 * 弹出表单的容器
 */
wrapper?: Wrapper | WrapperFn<T>;

/**
 * 检索表单属性
 */
searchForm?: { defaultExpandCount?: number } & FormProps<T>;

/**
 * 详情列表属性
 */
detailList?: DescriptionsProps;

/**
 * 更新表单属性
 */
updateForm?: FormProps<T>;

/**
 * 检索数据
 */
onSearch?: (record: T) => void;

/**
 * 获取详情
 */
onDetail?: (record: T) => void;

/**
 * 更新数据
 */
onUpdate?: (record: T) => void;

/**
 * 删除数据
 */
onDelete?: (record: T) => void;
```

### Column

```typescript
/**
 * 控制当前表格中是否渲染此字段
 */
hideInSearchTable?: boolean;

/**
 * 控制检索表单中是否渲染此字段
 */
hideInSearchForm?: boolean;

/**
 * 控制详情列表中是否渲染此字段
 */
hideInDetailList?: boolean;

/**
 * 控制更新表单中是否渲染此字段
 */
hideInUpdateForm?: boolean;

/**
 * 表单布局
 */
layout?: RecursivePartial<typeof defaultLayout>;

/**
 * SearchFormItem额外属性
 */
searchFormItemProps?: IFormItemProps<T> | FormItemPropsFn<T>;

/**
 * DetailListItem额外属性
 */
detailListItemProps?: Omit<DescriptionsItemProps, 'children'>;

/**
 * UpdateFormItem额外属性
 */
updateFormItemProps?: IFormItemProps<T> | FormItemPropsFn<T>;

/**
 * 输入项属性，根据type可选择antd中对应的输入组件属性
 * 也可以是自定义组件
 */
dataEntry?: DataEntry<T>;
```
