import React, { useState } from 'react';
import { Card, Drawer, Modal, Form, Button, Popconfirm } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { ModalProps } from 'antd/es/modal';
import { PlusOutlined, ReadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { delay, localize } from '../utils';
import { InfoBar, ToolBar } from './component';
import SearchList from './search-list';
import SearchForm from './search-form';
import SubmitForm from './submit-form';
import DetailList from './detail-list';
import UpdateForm from './update-form';
import { IAdvancedTable, IColumnProps } from './typings.d';
import './index.less';

function AdvancedTable<IRecord extends object = {}>(props: IAdvancedTable<IRecord>) {
  const {
    wrapper = {},

    searchForm: searchFormProps,
    submitForm: submitFormProps,
    detailList: detailListProps,
    updateForm: updateFormProps,

    onSearch = console.debug,
    onSubmit = console.debug,
    onDetail = console.debug,
    onUpdate = console.debug,
    onDelete = console.debug,

    columns: userColumns = [],
    ...restProps
  } = props;

  const initialRecord = {} as IRecord;
  const [record, setRecord] = useState<IRecord>(initialRecord);
  const initialVisible = { plus: false, view: false, edit: false };
  const [visible, setVisible] = useState(initialVisible);

  const [retrieving, setRetrieving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [searchForm] = Form.useForm();
  const [submitForm] = Form.useForm();
  const [detailList] = [{ getFieldValue: (key: string) => record[key], resetFields: () => {} }];
  const [updateForm] = Form.useForm();

  const {
    plus: { type: wrapperPlusType, ...restWrapperPlus } = {
      type: 'Drawer',
      title: '新建',
      width: '80vw',
    },
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

  const show = (type: keyof typeof initialVisible) => {
    setVisible({ ...visible, [type]: true });
  };

  const hide = (type: keyof typeof initialVisible) => {
    setVisible({ ...visible, [type]: false });
    setRecord(initialRecord);
  };

  const plus = (record: IRecord) => {
    setRecord(record);
    show('plus');
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

  /**
   * 检索表单搜索与重置操作
   */
  const searchFormSearch = async (values: IRecord) => {
    // e.preventDefault();
    try {
      setRetrieving(true);
      // const values = await searchForm.validateFields();
      if (onSearch) await onSearch(localize(values as any) as IRecord);
      await delay(300);
    } catch (errors) {
      console.error(errors);
    } finally {
      setRetrieving(false);
    }
  };

  /**
   * 录入表单提交与取消操作
   */
  const submitFormSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const values = await submitForm.validateFields();
      if (onSubmit) await onSubmit(localize(values) as IRecord);
      await delay(300);
      hide('plus');
    } catch (errors) {
      console.error(errors);
    } finally {
      setSubmitting(false);
    }
  };
  const submitFormCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.target);
    e.preventDefault();
    hide('plus');
  };

  /**
   * 更新表单提交与取消操作
   */
  const updateFormSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const values = await updateForm.validateFields();
      if (onUpdate) await onUpdate(localize(values) as IRecord);
      await delay(300);
      hide('edit');
    } catch (errors) {
      console.error(errors);
    } finally {
      setSubmitting(false);
    }
  };
  const updateFormCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.target);
    e.preventDefault();
    hide('edit');
  };

  const submitButton = (record: IRecord) => (
    <Button
      key="submit"
      title="新建"
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => plus(record)}
    >
      新建
    </Button>
  );
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
    key: '__OPERATIONS__',
    width: 128,
    align: 'center',
    fixed: 'right',
    hideInSearchForm: true,
    hideInSubmitForm: true,
    hideInDetailList: true,
    hideInUpdateForm: true,
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

  const SearchListComponent = (
    <SearchList<IRecord>
      {...restProps}
      columns={columns.filter(({ hideInSearchList }) => !hideInSearchList)}
    />
  );

  const SearchFormComponent = (
    <SearchForm<IRecord>
      form={searchForm}
      columns={userColumns
        .filter(({ hideInSearchForm }) => !hideInSearchForm)
        .sort(
          (
            { searchFormItemProps: { order: oa = Infinity } = {} as any },
            { searchFormItemProps: { order: ob = Infinity } = {} as any },
          ) => oa - ob,
        )}
      record={record}
      retrieving={retrieving}
      onFinish={searchFormSearch}
      {...searchFormProps}
    />
  );
  const SubmitFormComponent = (
    <SubmitForm<IRecord>
      form={submitForm}
      columns={userColumns
        .filter(({ hideInSubmitForm }) => !hideInSubmitForm)
        .sort(
          (
            { submitFormItemProps: { order: oa = Infinity } = {} as any },
            { submitFormItemProps: { order: ob = Infinity } = {} as any },
          ) => oa - ob,
        )}
      record={record}
      {...submitFormProps}
    />
  );
  const DetailListComponent = (
    <DetailList<IRecord>
      list={detailList}
      columns={userColumns
        .filter(({ hideInDetailList }) => !hideInDetailList)
        .sort(
          (
            { detailListItemProps: { order: oa = Infinity } = {} as any },
            { detailListItemProps: { order: ob = Infinity } = {} as any },
          ) => oa - ob,
        )}
      record={record}
      {...detailListProps}
    />
  );
  const UpdateFormComponent = (
    <UpdateForm<IRecord>
      form={updateForm}
      columns={userColumns
        .filter(({ hideInUpdateForm }) => !hideInUpdateForm)
        .sort(
          (
            { updateFormItemProps: { order: oa = Infinity } = {} as any },
            { updateFormItemProps: { order: ob = Infinity } = {} as any },
          ) => oa - ob,
        )}
      record={record}
      {...updateFormProps}
    />
  );

  return (
    <div className="ant-enhance-advanced-table">
      {searchFormProps && (
        <Card bordered={false} style={{ marginBottom: 16 }} bodyStyle={{ paddingBottom: 0 }}>
          {SearchFormComponent}
        </Card>
      )}

      <Card bordered={false} bodyStyle={{ paddingTop: 0 }}>
        {submitFormProps && <ToolBar actions={[submitButton(record)]} settings={[]} />}
        {/*
        <InfoBar />
        */}
        {SearchListComponent}
      </Card>

      {wrapperPlusType === 'Drawer' && (
        <Drawer
          {...(restWrapperPlus as DrawerProps)}
          visible={visible.plus}
          onClose={submitFormCancel as any}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button type="default" onClick={submitFormCancel} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button type="primary" onClick={submitFormSubmit} loading={submitting}>
                提交
              </Button>
            </div>
          }
        >
          {SubmitFormComponent}
        </Drawer>
      )}

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
          {DetailListComponent}
        </Drawer>
      )}

      {wrapperEditType === 'Drawer' && (
        <Drawer
          {...(restWrapperEdit as DrawerProps)}
          visible={visible.edit}
          onClose={updateFormCancel as any}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button type="default" onClick={updateFormCancel} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button type="primary" onClick={updateFormSubmit} loading={submitting}>
                提交
              </Button>
            </div>
          }
        >
          {UpdateFormComponent}
        </Drawer>
      )}

      {wrapperPlusType === 'Modal' && (
        <Modal
          {...(restWrapperPlus as ModalProps)}
          visible={visible.plus}
          confirmLoading={submitting}
          onOk={submitFormSubmit}
          onCancel={submitFormCancel}
        >
          {SubmitFormComponent}
        </Modal>
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
          {DetailListComponent}
        </Modal>
      )}

      {wrapperEditType === 'Modal' && (
        <Modal
          {...(restWrapperEdit as ModalProps)}
          visible={visible.edit}
          confirmLoading={submitting}
          onOk={updateFormSubmit}
          onCancel={updateFormCancel}
        >
          {UpdateFormComponent}
        </Modal>
      )}
    </div>
  );
}

export default AdvancedTable;
export { SearchList, SearchForm, SubmitForm, DetailList, UpdateForm, IColumnProps };
export { ISearchList, ISearchForm, ISubmitForm, IDetailList, IUpdateForm } from './typings.d';
