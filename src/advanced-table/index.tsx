import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Card, Drawer, Modal, Form, Button, Popconfirm, Popover, Tooltip } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { ModalProps } from 'antd/es/modal';
import {
  PlusOutlined,
  ProfileOutlined,
  FormOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ImportOutlined,
  ExportOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import { List, useFullscreen } from '../hooks';
import { delay, localize } from '../utils';
import { InfoBar, ToolBar, ColumnSetting } from './component';
import SearchList from './search-list';
import SearchForm from './search-form';
import SubmitForm from './submit-form';
import DetailList from './detail-list';
import UpdateForm from './update-form';
import { wrapperType } from './profile';
import {
  IAdvancedTable,
  IColumnProps,
  ISearchList,
  ISearchForm,
  ISubmitForm,
  IDetailList,
  IUpdateForm,
} from './typings';

import './index.less';

function AdvancedTable<IRecord extends Record<string, any>>(props: IAdvancedTable<IRecord>) {
  const {
    toolbar,

    wrapper = {},
    onWrapperShow,
    onWrapperHide,

    searchForm: searchFormProps,
    submitForm: submitFormProps,
    detailList: detailListProps,
    updateForm: updateFormProps,

    onImport = () => window?.alert?.('You need to provide the onImport method!'),
    onExport = () => window?.alert?.('You need to provide the onExport method!'),

    onSearch,
    onSubmit,
    onDetail,
    onUpdate,
    onDelete,

    columns: userColumns = [],

    ...restProps
  } = props;

  const searchListRef = useRef<HTMLDivElement>(null);

  const mountContainer = searchListRef?.current || document.body;

  const fullscreen = useFullscreen();

  const showToolbar = toolbar !== false;

  const initialRecord = {} as IRecord;
  const [record, setRecord] = useState<IRecord>(initialRecord);

  const initialVisible = { plus: false, view: false, edit: false };
  const [visible, setVisible] = useState(initialVisible);

  const [retrieving, setRetrieving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /**
   * 初始化FormInstance
   */
  const [searchForm] = Form.useForm();
  const [submitForm] = Form.useForm();
  const [detailList] = List.useList();
  const [updateForm] = Form.useForm();

  /**
   * 初始化表单容器
   */
  const {
    plus: { type: wrapperPlusType, ...restWrapperPlus } = {
      type: wrapperType.Drawer,
      title: '新建',
      width: '80vw',
    },
    view: { type: wrapperViewType, ...restWrapperView } = {
      type: wrapperType.Drawer,
      title: '详情',
      width: '80vw',
    },
    edit: { type: wrapperEditType, ...restWrapperEdit } = {
      type: wrapperType.Drawer,
      title: '更新',
      width: '60vw',
    },
  } = typeof wrapper === 'function' ? wrapper(record) : wrapper;

  /**
   * 控制模态框/抽屉的显隐
   */
  const show = (type: keyof typeof initialVisible, record: IRecord) => {
    onWrapperShow?.(type, record);
    setVisible({ ...visible, [type]: true });
  };

  const hide = (type: keyof typeof initialVisible, record: IRecord) => {
    onWrapperHide?.(type, record);
    setVisible({ ...visible, [type]: false });
    setRecord(initialRecord);
  };

  /**
   * crud容器快捷操作
   */
  const plus = async (record: IRecord) => {
    setRecord(record);
    show('plus', record);
  };

  const view = async (record: IRecord) => {
    const resp = await onDetail?.(record);
    setRecord(resp || record);
    show('view', resp || record);
  };

  const edit = async (record: IRecord) => {
    const resp = await onDetail?.(record);
    setRecord(resp || record);
    show('edit', resp || record);
  };

  const del = async (record: IRecord) => {
    onDelete?.(record);
  };

  /**
   * 检索表单搜索与重置操作
   */
  const searchFormSearch = useCallback(
    async (values: IRecord) => {
      // e.preventDefault();
      try {
        setRetrieving(true);
        // const values = await searchForm.validateFields();
        await onSearch?.(localize(values as any) as IRecord);
        await delay(300);
      } catch (errors) {
        console.error(errors);
      } finally {
        setRetrieving(false);
      }
    },
    [onSearch],
  );

  /**
   * 录入表单提交与取消操作
   */
  const submitFormSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const values = await submitForm.validateFields();
      await onSubmit?.(localize(values) as IRecord);
      await delay(300);
      hide('plus', record);
    } catch (errors) {
      console.error(errors);
    } finally {
      setSubmitting(false);
    }
  };
  const submitFormCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.target);
    e.preventDefault();
    hide('plus', record);
  };

  /**
   * 更新表单提交与取消操作
   */
  const updateFormSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const values = await updateForm.validateFields();
      await onUpdate?.(localize(values) as IRecord);
      await delay(300);
      hide('edit', record);
    } catch (errors) {
      console.error(errors);
    } finally {
      setSubmitting(false);
    }
  };
  const updateFormCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.target);
    e.preventDefault();
    hide('edit', record);
  };

  /**
   * 预设的操作
   */
  const submitButton = (record: IRecord) => (
    <Button
      key="submit"
      title="新建"
      type="default"
      icon={<PlusOutlined />}
      onClick={() => plus(record)}
    >
      新建
    </Button>
  );
  const detailButton = (record: IRecord) => (
    <Tooltip key="detail" title="详情" getPopupContainer={() => mountContainer}>
      <Button
        key="detail"
        title="详情"
        type="link"
        icon={<ProfileOutlined />}
        onClick={() => view(record)}
      />
    </Tooltip>
  );
  const updateButton = (record: IRecord) => (
    <Tooltip key="update" title="编辑" getPopupContainer={() => mountContainer}>
      <Button
        key="update"
        title="编辑"
        type="link"
        icon={<FormOutlined />}
        onClick={() => edit(record)}
      />
    </Tooltip>
  );
  const deleteButton = (record: IRecord) => (
    <Tooltip key="delete" title="删除" getPopupContainer={() => mountContainer}>
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
    </Tooltip>
  );
  const itemToAction = (record: IRecord) => (item: any) => {
    if (item === '<detail>') return detailButton(record);
    if (item === '<update>') return updateButton(record);
    if (item === '<delete>') return deleteButton(record);
    return item;
  };

  /**
   * 默认操作列定义
   */
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

  /**
   * 根据用户设定注入预设动作
   */
  const operations = {
    ...dfltOperations,
    ...userOperations,
    render: (text: any, record: IRecord, index: number) => {
      return userOperations.render && typeof userOperations.render === 'function'
        ? (userOperations.render!(text, record, index) as any[]).map(itemToAction(record))
        : (dfltOperations.render!(text, record, index) as any[]).map(itemToAction(record));
    },
  };
  const columns = userColumns.filter(KEY_NE_OPERATIONS).concat(operations);

  /**
   * 受控的列定义
   */
  const [col, setCol] = useState(columns);

  /**
   * 工具栏预设功能
   */
  const $settings = {
    /**
     * 刷新数据
     */
    reload: (
      <Tooltip key="reload" title="刷新" getPopupContainer={() => mountContainer}>
        <ReloadOutlined
          key="reload"
          title="刷新"
          onClick={() => {
            onSearch?.();
          }}
        />
      </Tooltip>
    ),

    /**
     * 导入导出
     */
    import: (
      <Tooltip key="import" title="导入" getPopupContainer={() => mountContainer}>
        <ImportOutlined
          key="import"
          title="导入"
          onClick={() => {
            onImport?.();
          }}
        />
      </Tooltip>
    ),
    export: (
      <Tooltip key="export" title="导出" getPopupContainer={() => mountContainer}>
        <ExportOutlined
          key="export"
          title="导出"
          onClick={() => {
            onExport?.();
          }}
        />
      </Tooltip>
    ),

    /**
     * 行距设置
     */
    density: (
      <Tooltip key="density" title="行距" getPopupContainer={() => mountContainer}>
        <ColumnHeightOutlined key="density" title="行距" onClick={console.log} />
      </Tooltip>
    ),

    /**
     * 列序设置
     */
    setting: (
      <Tooltip key="setting" title="设置" getPopupContainer={() => mountContainer}>
        <Popover
          key="setting"
          arrowPointAtCenter
          placement="bottomRight"
          overlayClassName="toolbar-column-setter-popover"
          trigger="click"
          getPopupContainer={() => mountContainer}
          content={<ColumnSetting columns={col} onColumnsChange={setCol} />}
        >
          <SettingOutlined title="设置" />
        </Popover>
      </Tooltip>
    ),

    /**
     * 全屏设置
     */
    fullscreen: !fullscreen ? (
      <Tooltip key="fullscreen" title="进入全屏" getPopupContainer={() => mountContainer}>
        <FullscreenOutlined
          key="fullscreen"
          title="全屏"
          onClick={() => {
            searchListRef.current?.requestFullscreen();
          }}
        />
      </Tooltip>
    ) : (
      <Tooltip key="fullscreenexit" title="退出全屏" getPopupContainer={() => mountContainer}>
        <FullscreenExitOutlined
          key="fullscreenexit"
          title="全屏"
          onClick={() => {
            document.exitFullscreen();
          }}
        />
      </Tooltip>
    ),
  };

  /**
   * 禁用
   * toolbar={false}
   * 只显示标题
   * toolbar={ {title: 'Header'} }
   * 不显示actions
   * toolbar={ {actions: []} }
   * 控制settings
   * toolbar={ {settings: {reload: false}} }
   */
  const {
    title: toolbarTitle,
    actions,
    settings = {
      reload: true,
      density: false,
      import: false,
      export: false,
      setting: true,
      fullscreen: true,
    },
  } = toolbar || {};
  const toolbarActions = actions ? actions.concat(submitButton(record)) : [];
  const toolbarSettings = Object.keys(settings).map((key) => settings[key] && $settings[key]);

  /**
   * 检索列表
   */
  const SearchListComponent = useMemo(
    () => (
      <SearchList<IRecord>
        {...restProps}
        // columns={columns.filter(({ hideInSearchList }) => !hideInSearchList)}
        columns={col.filter(({ hideInSearchList }) => !hideInSearchList)}
      />
    ),
    [col, restProps],
  );

  /**
   * 检索表单
   */
  const SearchFormComponent = useMemo(
    () => (
      <SearchForm<IRecord>
        form={searchForm}
        columns={userColumns
          .filter(({ hideInSearchForm }) => !hideInSearchForm)
          .sort(order('searchFormItemProps'))}
        record={record}
        retrieving={retrieving}
        onFinish={searchFormSearch}
        {...searchFormProps}
      />
    ),
    [record, retrieving, searchForm, searchFormProps, searchFormSearch, userColumns],
  );

  /**
   * 录入表单
   */
  const SubmitFormComponent = useMemo(
    () => (
      <SubmitForm<IRecord>
        form={submitForm}
        columns={userColumns
          .filter(({ hideInSubmitForm }) => !hideInSubmitForm)
          .sort(order('submitFormItemProps'))}
        record={record}
        {...submitFormProps}
      />
    ),
    [record, submitForm, submitFormProps, userColumns],
  );

  /**
   * 详情列表
   */
  const DetailListComponent = useMemo(
    () => (
      <DetailList<IRecord>
        list={detailList}
        columns={userColumns
          .filter(({ hideInDetailList }) => !hideInDetailList)
          .sort(order('detailListItemProps'))}
        record={record}
        {...detailListProps}
      />
    ),
    [detailList, detailListProps, record, userColumns],
  );

  /**
   * 更新表单
   */
  const UpdateFormComponent = useMemo(
    () => (
      <UpdateForm<IRecord>
        form={updateForm}
        columns={userColumns
          .filter(({ hideInUpdateForm }) => !hideInUpdateForm)
          .sort(order('updateFormItemProps'))}
        record={record}
        {...updateFormProps}
      />
    ),
    [record, updateForm, updateFormProps, userColumns],
  );

  return (
    <div className="ant-enhance-advanced-table">
      {searchFormProps && (
        <Card bordered={false} style={{ marginBottom: 16 }} bodyStyle={{ paddingBottom: 0 }}>
          {SearchFormComponent}
        </Card>
      )}

      <div ref={searchListRef}>
        <Card
          bordered={false}
          style={{
            minHeight: '100%',
          }}
        >
          {showToolbar && (
            <ToolBar
              // disabled
              title={toolbarTitle}
              actions={toolbarActions}
              settings={toolbarSettings}
            />
          )}
          {/*
          <InfoBar />
          */}
          {SearchListComponent}
        </Card>
      </div>

      {wrapperPlusType === wrapperType.Drawer && (
        <Drawer
          getContainer={mountContainer}
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

      {wrapperViewType === wrapperType.Drawer && (
        <Drawer
          getContainer={mountContainer}
          {...(restWrapperView as DrawerProps)}
          visible={visible.view}
          onClose={(e) => {
            e.preventDefault();
            hide('view', record);
          }}
          footer={null}
        >
          {DetailListComponent}
        </Drawer>
      )}

      {wrapperEditType === wrapperType.Drawer && (
        <Drawer
          getContainer={mountContainer}
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

      {wrapperPlusType === wrapperType.Modal && (
        <Modal
          getContainer={mountContainer}
          {...(restWrapperPlus as ModalProps)}
          visible={visible.plus}
          confirmLoading={submitting}
          onOk={submitFormSubmit}
          onCancel={submitFormCancel}
        >
          {SubmitFormComponent}
        </Modal>
      )}

      {wrapperViewType === wrapperType.Modal && (
        <Modal
          getContainer={mountContainer}
          {...(restWrapperView as ModalProps)}
          visible={visible.view}
          // confirmLoading={submitting}
          onOk={undefined}
          onCancel={(e) => {
            e.preventDefault();
            hide('view', record);
          }}
          footer={null}
        >
          {DetailListComponent}
        </Modal>
      )}

      {wrapperEditType === wrapperType.Modal && (
        <Modal
          getContainer={mountContainer}
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

export default React.memo(AdvancedTable);
export { SearchList, SearchForm, SubmitForm, DetailList, UpdateForm };
export type { IColumnProps, ISearchList, ISearchForm, ISubmitForm, IDetailList, IUpdateForm };

const order = (props: string) => (
  { [props]: { order: oa = Infinity } = {} as any }: Record<string, any>,
  { [props]: { order: ob = Infinity } = {} as any }: Record<string, any>,
) => oa - ob;
