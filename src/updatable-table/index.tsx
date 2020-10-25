import React, { useState } from 'react';
import { Drawer, Modal, Form, Button, Popconfirm } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { ModalProps } from 'antd/es/modal';
import { DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';
import { delay, localize } from '../utils';
import UpdateTable from './update-table';
import DetailList from './detail-list';
import UpdateForm from './update-form';
import { IUpdatableTable, IColumnProps } from './typings';
import './index.less';

function UpdatableTable<IRecord extends object = {}>(props: IUpdatableTable<IRecord>) {
  const {
    wrapper = {},
    columns: userColumns = [],
    onUpdate,
    onError,
    onDelete,
    detailListProps,
    updateFormProps,
    ...restProps
  } = props;

  const initialRecord = {} as IRecord;
  const [record, setRecord] = useState<IRecord>(initialRecord);
  const [visible, setVisible] = useState({ view: false, edit: false });
  const [submitting, setSubmitting] = useState(false);
  const [list] = [{ getFieldValue: (key: string) => record[key], resetFields: () => {} }];
  const [form] = Form.useForm();

  const {
    view: { type: wrapperViewType, ...restWrapperView } = {
      type: 'Drawer',
      title: '详情',
      width: '80vw',
    },
    edit: { type: wrapperEditType, ...restWrapperEdit } = {
      type: 'Drawer',
      title: '更新',
      width: '60vw',
    },
  } = typeof wrapper === 'function' ? wrapper(record) : wrapper;

  const show = (type: 'view' | 'edit') => {
    setVisible({ ...visible, [type]: true });
  };

  const hide = (type: 'view' | 'edit') => {
    setVisible({ ...visible, [type]: false });
    // if (type === 'edit') form.resetFields();
    // setRecord(initialRecord);
  };

  const view = (record: IRecord) => {
    setRecord(record);
    show('view');
  };

  const edit = (record: IRecord) => {
    setRecord(record);
    show('edit');
  };

  const del = (record: IRecord) => {
    if (onDelete) onDelete(record);
  };

  const submit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.target);
    e.preventDefault();
    try {
      setSubmitting(true);
      await delay(500);
      const values = await form.validateFields();
      if (onUpdate) onUpdate(localize(values) as IRecord);
      hide('edit');
    } catch (errors) {
      if (onError) onError(errors);
    } finally {
      setSubmitting(false);
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.target);
    e.preventDefault();
    hide('edit');
  };

  const detailButton = (record: IRecord) => (
    <Button
      key="detail"
      title="详情"
      type="link"
      icon={<ReadOutlined />}
      onClick={() => view(record)}
    />
  );
  const updateButton = (record: IRecord) => (
    <Button
      key="update"
      title="编辑"
      type="link"
      icon={<EditOutlined />}
      onClick={() => edit(record)}
    />
  );
  const deleteButton = (record: IRecord) => (
    <Popconfirm
      key="delete"
      title="确定删除吗？"
      okText="确定"
      cancelText="取消"
      onConfirm={() => del(record)}
    >
      <Button
        // key="delete"
        title="删除"
        type="link"
        icon={<DeleteOutlined />}
        // onClick={() => del(record)}
      />
    </Popconfirm>
  );
  const itemToAction = (record: IRecord) => (item: any) => {
    if (item === '<detail>') return detailButton(record);
    if (item === '<update>') return updateButton(record);
    if (item === '<delete>') return deleteButton(record);
    return item;
  };
  const dfltOperations: IColumnProps<IRecord> = {
    title: '操作',
    key: 'OPERATIONS',
    width: 128,
    align: 'center',
    fixed: 'right',
    render: (text, record) => ['<detail>', '<update>', '<delete>'],
  };
  const KEY_EQ_OPERATIONS = ({ key }: IColumnProps<IRecord>) => key === '__OPERATIONS__';
  const KEY_NE_OPERATIONS = ({ key }: IColumnProps<IRecord>) => key !== '__OPERATIONS__';
  const userOperations: IColumnProps<IRecord> = userColumns.find(KEY_EQ_OPERATIONS) || {};
  // 根据用户设定注入预设动作
  const operations = {
    ...dfltOperations,
    ...userOperations,
    render: (text: any, record: IRecord, index: number) =>
      userOperations.render && typeof userOperations.render === 'function'
        ? (userOperations.render!(text, record, index) as any[]).map(itemToAction(record))
        : (dfltOperations.render!(text, record, index) as any[]).map(itemToAction(record)),
  };
  const columns = userColumns.filter(KEY_NE_OPERATIONS).concat(operations);

  const detailList = (
    <DetailList<IRecord>
      list={list}
      columns={userColumns.filter(({ hideInList }) => !hideInList)}
      record={record}
      /**
       * DescProps
       */
      {...detailListProps}
    />
  );
  const updateForm = (
    <UpdateForm<IRecord>
      form={form}
      columns={userColumns.filter(({ hideInForm }) => !hideInForm)}
      record={record}
      /**
       * FormProps
       */
      {...updateFormProps}
    />
  );

  return (
    <div className="ant-enhance-updatable-table">
      <UpdateTable<IRecord>
        {...restProps}
        columns={columns.filter(({ hideInTable }) => !hideInTable)}
      />

      {wrapperViewType === 'Drawer' && (
        <Drawer
          {...(restWrapperView as DrawerProps)}
          visible={visible.view}
          onClose={e => {
            e.preventDefault();
            hide('view');
          }}
          footer={null}
        >
          {detailList}
        </Drawer>
      )}

      {wrapperEditType === 'Drawer' && (
        <Drawer
          {...(restWrapperEdit as DrawerProps)}
          visible={visible.edit}
          onClose={cancel as any}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button type="default" onClick={cancel} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button type="primary" onClick={submit} loading={submitting}>
                提交
              </Button>
            </div>
          }
        >
          {updateForm}
        </Drawer>
      )}

      {wrapperViewType === 'Modal' && (
        <Modal
          {...(restWrapperView as ModalProps)}
          visible={visible.view}
          // confirmLoading={submitting}
          onOk={undefined}
          onCancel={e => {
            e.preventDefault();
            hide('view');
          }}
          footer={null}
        >
          {detailList}
        </Modal>
      )}

      {wrapperEditType === 'Modal' && (
        <Modal
          {...(restWrapperEdit as ModalProps)}
          visible={visible.edit}
          confirmLoading={submitting}
          onOk={submit}
          onCancel={cancel}
        >
          {updateForm}
        </Modal>
      )}
    </div>
  );
}

export default UpdatableTable;
export { UpdateTable, DetailList, UpdateForm, IColumnProps };
export { ITableProps, IListProps, IFormProps } from './typings';
