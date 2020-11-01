import React from 'react';
import { Row, Col, Form } from 'antd';
import getInput from '../../utils/get-form-input';
import { defaultLayout } from '../layouts';
import { defaultDataEntry } from '../profile';
import { IFormProps, IColumnProps, DataEntry, Option } from '../typings';

const FormItem = Form.Item;

function SearchForm<IRecord extends object = {}>(props: IFormProps<IRecord>) {
  const { form, columns = [], record = {} as IRecord, ...restProps } = props;

  const renderFormItem = (column: IColumnProps<IRecord>) => {
    const {
      title,
      dataIndex,
      dataEntry = defaultDataEntry,
      layout: userLayout,
      formItemProps: userFormItemProps = {},
      hideInSearch = false,
    } = column;

    if (hideInSearch) return null;

    const layout = { ...defaultLayout, ...userLayout };

    const userFormItemPropsFn =
      typeof userFormItemProps === 'function' ? userFormItemProps : () => userFormItemProps;

    const formItemProps = () => ({
      label: title,
      name: dataIndex,
      ...userFormItemPropsFn(record, form!),
    });

    return (
      <Col key={String(dataIndex)} {...layout.col}>
        <FormItem {...layout.formItem} {...formItemProps()}>
          {getInput<IRecord>(dataIndex, dataEntry, record, form)}
        </FormItem>
      </Col>
    );
  };

  return (
    <Form form={form} name="search" {...restProps}>
      <Row gutter={0x10}>{columns.map(renderFormItem)}</Row>
    </Form>
  );
}

export default SearchForm;
