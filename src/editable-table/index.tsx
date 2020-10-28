import React, { Fragment } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Table } from 'antd';
import DataDisplay from './data-display';
import DataEntry from './data-entry';
import DataOperation from './data-operation';
import InitialValue from './InitialValue';
import {
  IRecord,
  IResponse,
  IOption,
  IRelationship,
  ColumnsPropsWithExtraProps,
  IProps,
  IState,
} from './typings';

type IDelay = (milliseconds: number) => Promise<number>;
const delay: IDelay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const defaultValidate = (record: IRecord): IResponse => ({code: 200, data: record, mesg: 'You need to provide a validator!'}); // prettier-ignore

class EditableTable extends React.PureComponent<IProps, IState> {
  private index = 0;

  private cache = {} as IRecord;

  rowKey: string;

  operation: object;

  columns: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      // data: props.value,
      loading: false,
    };
    const { rowKey } = props;
    this.rowKey = rowKey;
    this.operation = {
      title: '操作',
      key: 'operation',
      width: 112,
      align: 'center',
      // fixed: 'right',
      render: (text: any, { [rowKey]: key, editing, newly, depth = 0 }: IRecord) => {
        switch (depth) {
          case 0:
          case 1:
          case 2:
            return (
              <Button.Group size="small">
                {/* eslint-disable react/jsx-props-no-multi-spaces */}
                {/* 默认状态 可操作 编辑 / 删除 */}
                {editing || (
                  <React.Fragment>
                    <DataOperation
                      disabled={false}
                      type="primary"
                      // icon="edit"
                      confirm={false}
                      onClick={e => this.toggle(e!, key)}
                    >
                      编辑
                    </DataOperation>
                    <DataOperation
                      disabled={false}
                      type="dashed"
                      // icon="delete"
                      confirm
                      onClick={e => this.delete(e!, key)}
                    >
                      删除
                    </DataOperation>
                  </React.Fragment>
                )}
                {/* 编辑状态 原有数据时 可操作 保存 / 取消 */}
                {editing &&
                  (newly || (
                    <React.Fragment>
                      <DataOperation
                        disabled={false}
                        type="primary"
                        // icon="save"
                        confirm={false}
                        onClick={e => this.update(e!, key)}
                      >
                        保存
                      </DataOperation>
                      <DataOperation
                        disabled={false}
                        type="dashed"
                        // icon="undo"
                        confirm={false}
                        onClick={e => this.cancel(e!, key)}
                      >
                        取消
                      </DataOperation>
                    </React.Fragment>
                  ))}
                {/* 编辑状态 新增记录时 可操作 添加 / 取消 */}
                {editing && newly && (
                  <React.Fragment>
                    <DataOperation
                      disabled={false}
                      type="primary"
                      // icon="save"
                      confirm={false}
                      onClick={e => this.update(e!, key)}
                    >
                      添加
                    </DataOperation>
                    <DataOperation
                      disabled={false}
                      type="dashed"
                      // icon="delete"
                      confirm={false}
                      onClick={e => this.delete(e!, key)}
                    >
                      删除
                    </DataOperation>
                  </React.Fragment>
                )}
              </Button.Group>
            );
          default:
            return null;
        }
      },
    };
  }

  /**
   * 切换编辑状态
   * @param e: React.MouseEvent | React.KeyboardEvent
   * @param key: string
   */
  toggle = (e: React.MouseEvent<HTMLElement>, key: string) => {
    // console.debug('切换状态', e, key);
    e.preventDefault();
    const { dataSource: data = [] } = this.props;
    const newData = data.map(item => {
      // 进入编辑状态时保存原始数据
      if (item[this.rowKey] === key) {
        this.cache[key] = { ...item };
        return { ...item, editing: !item.editing };
      }
      return item;
    });
    // this.setState({ data: newData });
    const { onChange } = this.props;
    if (onChange) onChange(newData);
  };

  /**
   * 取消操作
   * @param e: React.MouseEvent
   * @param key: string
   */
  cancel = (e: React.MouseEvent<HTMLElement>, key: string) => {
    // console.debug('取消操作', e, key);
    e.preventDefault();
    const { dataSource: data = [] } = this.props;
    const newData = data.map(item => {
      // 退出编辑状态时还原原始数据
      if (item[this.rowKey] === key) {
        return { ...item, ...this.cache[key], editing: !item.editing };
      }
      return item;
    });
    // this.setState({ data: newData });
    const { onChange } = this.props;
    if (onChange) onChange(newData);
  };

  /**
   * 插入记录
   * @param e: React.MouseEvent | React.KeyboardEvent
   */
  insert = (e: React.MouseEvent<HTMLElement>) => {
    // console.debug('新增操作', e);
    e.preventDefault();
    const { dataSource: data = [] } = this.props;
    const k = `NEW_ID_${this.index}`;
    this.index += 1;

    const c = this.columns;
    const f = c.filter(({ dataIndex }: IRecord) => dataIndex);
    const m = f.map(({ dataIndex, dataEntry }: any) => ({
      [dataIndex]: InitialValue(dataEntry),
    }));
    const r = m.reduce((acc: object, cur: IRecord) => ({ ...acc, ...cur }), {});
    const n = { ...r, [this.rowKey]: k, editing: true, newly: true };
    const newData = [...data, n];
    const { onChange } = this.props;
    if (onChange) onChange(newData);
  };

  /**
   * 更新记录
   * @param e: React.MouseEvent | React.KeyboardEvent
   * @param key: string
   */
  update = async (e: React.MouseEvent<HTMLElement>, key: string) => {
    // console.debug("更新操作", e, key);
    e.persist();

    this.setState({ loading: true });

    await delay(0xff);

    const columns = this.columns.filter(({ dataIndex }: IRecord) => dataIndex);

    const { dataSource: oldData = [], onUpdate, onChange } = this.props;
    const newData = oldData.map(item => ({ ...item }));
    const current = newData.find(item => item[this.rowKey] === key) || ({} as IRecord);
    // console.debug(current, columns);

    // 查找选择器的选项是否是__ALL__, 如果是则展开options
    const Select = columns.find((item: IRecord) => item.dataEntry?.type === 'Select') || {};
    const { dataIndex: DI, dataEntry: DE, relationships: RS = [] } = Select;
    if (current[DI] === '__ALL__') {
      const validate = async ({ value }: IOption, k: number) => {
        const m = columns.map(({ dataIndex }: IRecord) => ({
          [dataIndex]: current[dataIndex],
        }));
        const r = m.reduce((acc: object, cur: IRecord) => ({ ...acc, ...cur }), {});
        const n = {
          [this.rowKey]: k,
          ...r,
          ...this.relationships(value, DI, RS),
        };
        // console.debug('await validate 前', n);
        await this.validate(e, columns, n);
        // console.debug('await validate 后', n);
        return n;
      };
      const allData = (await Promise.all(DE.options.map(validate))) as IRecord[];
      if (onUpdate) onUpdate(current);
      if (onChange) onChange(allData);
    } else {
      await this.validate(e, columns, current);
      if (onUpdate) onUpdate(current);
      if (onChange) onChange(newData);
    }

    this.setState({ loading: false });
  };

  /**
   * 删除记录
   * @param e: React.MouseEvent | React.KeyboardEvent
   * @param key: string
   */
  delete = (e: React.MouseEvent<HTMLElement>, key: string) => {
    // console.debug("删除操作", e, key);
    const { dataSource: data = [] } = this.props;
    const newData = data.filter(item => item[this.rowKey] !== key);
    const { onChange } = this.props;
    if (onChange) onChange(newData);
  };

  /**
   *
   * @param e: e: React.ChangeEvent<HTMLInputElement>
   * @param key: string
   * @param field: string DataIndex 数据索引名称
   * @param relationships: array 关联字段属性定义
   */
  handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    field: string,
    relationships: IRelationship[],
  ) => {
    // console.debug(typeof e, e, key, field, relationships);

    // TODO 这里的类型需要考虑
    // const value = e.target ? e.target.value : e;
    const value = typeof e === 'object' ? (e.target && e.target.value) || e : e;

    const { dataSource: data = [] } = this.props;
    const newData = data.map(item => {
      if (item[this.rowKey] === key) {
        return { ...item, ...this.relationships(value, field, relationships) };
      }
      return item;
    });

    // this.setState({ data: newData });
    const { onChange } = this.props;
    if (onChange) onChange(newData);
  };

  relationships = (value: any, field: string, relationships: IRelationship[] = []) => {
    // console.debug(typeof value, value, field, relationships);
    // 根据选择的值从给定的DataSource中找出联动列的数据
    const F = (DI: string, DS: any[]) => (DS.find((i: any) => i[field] === value) || {})[DI];
    // 从relationships中查找出各项联动字段的映射值
    const G = ({ dataIndex: DI, dataSource: DS }: IRelationship) => ({
      [DI]: F(DI, DS),
    });
    const A = (ACC: object, CUR: object) => ({ ...ACC, ...CUR });
    const r = relationships.map(G).reduce(A, {});
    return { [field]: value, ...r };
  };

  validate = async (
    e: React.MouseEvent<HTMLElement>,
    columns: ColumnsPropsWithExtraProps<IRecord>[],
    current: IRecord,
  ): Promise<void> => {
    // TODO 校验机制需要增强
    // const Invalid = item => columns.some(({ dataIndex }) => !item[dataIndex]);
    // const invalid = Invalid(current);
    const invalid = false;
    if (invalid) {
      // 如果无效保持编辑状态
      message.error('请补充完整信息!!!');
      (e.target as HTMLInputElement).focus();
      /* eslint-disable no-param-reassign */
      current.editing = invalid;
    } else {
      // 后端校验结果
      const { onValidate = defaultValidate } = this.props;
      if (onValidate) {
        // 如果需要校验则编辑状态由validate负责
        const validate = await onValidate(current);
        const { code, mesg } = validate;
        const print = code === 200 ? console.info : console.warn;
        print('validate', mesg);
        current.editing = code !== 200;
      } else {
        // 如果需要校验则编辑状态由invalid负责
        current.editing = invalid;
      }
    }

    current.newly = current.editing;
  };

  render() {
    const { loading } = this.state;
    const {
      columns = [],
      rowKey = 'key',
      size = 'middle',
      bordered = false,
      defaultExpandAllRows = false,
      rowClassName = (record: IRecord) => (record.editing ? 'editing' : 'display'),
      onChange,
      ...restProps
    } = this.props;

    const c = (column: ColumnsPropsWithExtraProps<IRecord>) => {
      const { title, dataIndex, ellipsis, editable, dataEntry, relationships, render } = column;
      if (!dataIndex || !editable) return column;
      const defaultRender = (value: any, record: IRecord) => {
        const { [rowKey]: key, editing } = record;
        const Data = editing ? DataEntry : DataDisplay;
        return (
          <Data
            value={value}
            record={record}
            rowKey={key}
            field={dataIndex as string}
            dataEntry={dataEntry}
            ellipsis={!!ellipsis}
            relationships={relationships}
            onChange={this.handleChange}
          />
        );
      };
      return {
        ...column,
        title: (
          <div className="fieldWrap">
            <div className="field">{title}</div>
          </div>
        ),
        render: render || defaultRender,
      };
    };
    this.columns = columns.map(c).concat(this.operation);

    return (
      <div className={'editableTable'}>
        <Table<IRecord>
          columns={this.columns}
          rowKey={rowKey}
          bordered={bordered}
          size={size}
          defaultExpandAllRows={defaultExpandAllRows}
          rowClassName={rowClassName}
          loading={loading}
          {...restProps}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          icon={<PlusOutlined />}
          onClick={this.insert}
        >
          添加
        </Button>
      </div>
    );
  }
}

export default EditableTable;
