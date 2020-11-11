import React from 'react';
import { Row, Col, Form, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import getInput from './get-form-input';
import { defaultLayout } from '../layouts';
import { defaultDataEntry } from '../profile';
import { ISearchForm, IColumnProps } from '../typings';

const FormItem = Form.Item;

function SearchForm<IRecord extends object = {}>(props: ISearchForm<IRecord>) {
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

  return (
    <Form form={form} name="search-form" {...restProps}>
      <Row gutter={0x08}>
        <Col md={0x18} lg={0x10} xl={0x12} xxl={0x13}>
          <Row gutter={0x08}>{columns.map(renderFormItem)}</Row>
        </Col>
        <Col md={0x18} lg={0x08} xl={0x06} xxl={0x05}>
          <Row gutter={0x08} justify="center" align="middle">
            <Col>
              <Button type="primary" htmlType="submit" loading={retrieving}>
                搜索
              </Button>
            </Col>
            <Col>
              <Button type="default" htmlType="reset" onClick={() => form?.resetFields()}>
                重置
              </Button>
            </Col>
            <Col>
              <Button
                type="dashed"
                icon={expand ? <UpOutlined /> : <DownOutlined />}
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                更多
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;
