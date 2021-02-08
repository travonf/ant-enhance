import React from 'react';
import { Row, Col, Space, Form, Button } from 'antd';
import { SearchOutlined, UndoOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import getInput from './get-form-input';
import { defaultLayout } from '../layouts';
import { defaultDataEntry } from '../profile';
import { ISearchForm, IColumnProps } from '../typings';

const FormItem = Form.Item;

function SearchForm<IRecord extends Record<string, any>>(props: ISearchForm<IRecord>) {
  const {
    form,
    columns = [],
    record = {} as IRecord,
    retrieving,
    defaultExpandCount = 3,
    ...restProps
  } = props;
  const [expand, setExpand] = React.useState(false);

  /**
   * FormItem Render
   */
  const renderFormItem = (column: IColumnProps<IRecord>, index: number) => {
    const {
      title,
      dataIndex,
      dataEntry = defaultDataEntry,
      layout: userLayout,
      searchFormItemProps: userFormItemProps = {},
      hideInSearchForm = false,
    } = column;

    if (hideInSearchForm) return null;

    const layout = { ...defaultLayout, ...userLayout };

    const userFormItemPropsFn =
      typeof userFormItemProps === 'function' ? userFormItemProps : () => userFormItemProps;

    const formItemProps = () => ({
      label: title,
      name: dataIndex,
      ...userFormItemPropsFn(record, form!),
      required: false,
    });

    if (!expand && index > defaultExpandCount - 1) {
      return null;
    }

    const formItem = () => (
      <FormItem {...layout.searchForm.formItem} {...formItemProps()}>
        {getInput<IRecord>(dataIndex, dataEntry, record, form)}
      </FormItem>
    );

    return (
      <Col key={String(dataIndex)} {...layout.searchForm.col}>
        {formItem()}
      </Col>
    );
  };

  /**
   * ButtonGroup Render
   */
  const renderButtonGroup = (
    <>
      <Col>
        <Button
          // disabled
          type="primary"
          size="middle"
          icon={<SearchOutlined />}
          htmlType="submit"
          loading={retrieving}
        >
          搜索
        </Button>
      </Col>

      <Col>
        <Button
          // disabled
          type="default"
          size="middle"
          icon={<UndoOutlined />}
          htmlType="reset"
          onClick={() => form?.resetFields()}
        >
          重置
        </Button>
      </Col>

      {columns.length > defaultExpandCount && (
        <Col>
          <Button
            type="dashed"
            size="middle"
            icon={expand ? <UpOutlined /> : <DownOutlined />}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            更多
          </Button>
        </Col>
      )}
    </>
  );

  /**
   * 检索表单布局
   */
  const searchLayout = { xs: 0x18, sm: 0x0e, md: 0x0e, lg: 0x0f, xl: 0x10, xxl: 0x12 };
  const buttonLayout = { xs: 0x18, sm: 0x0a, md: 0x0a, lg: 0x09, xl: 0x08, xxl: 0x06 };

  return (
    <Form form={form} name="search-form" {...restProps}>
      <Row gutter={0x08}>
        <Col {...searchLayout}>
          <Row gutter={0x08} justify="start" align="middle">
            {columns.map(renderFormItem)}
          </Row>
        </Col>
        <Col {...buttonLayout}>
          <Row gutter={[0x08, 0x08]} justify="end" align="middle">
            {renderButtonGroup}
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default React.memo(SearchForm);
