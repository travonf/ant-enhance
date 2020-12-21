import React from 'react';
import { Row, Col, Form } from 'antd';
import { omit } from '../../utils';
import getInput from './get-form-input';
import getValue from './get-form-value';
import { defaultLayout } from '../layouts';
import { defaultDataEntry } from '../profile';
import { ISubmitForm, IColumnProps } from '../typings';

const FormItem = Form.Item;

function SubmitForm<IRecord extends object = {}>(props: ISubmitForm<IRecord>) {
  const {
    form,
    columns = [],
    record = {} as IRecord,
    //
    ...restProps
  } = props;
  const [, forceUpdate] = React.useState<object>();

  React.useEffect(() => {
    const keys = Object.keys(form?.getFieldsValue() || {});
    const values = {} as any;
    function setValue({ dataIndex, dataEntry = defaultDataEntry }: any) {
      if (dataIndex && keys.includes(dataIndex))
        values[dataIndex] = getValue<IRecord>(dataIndex, dataEntry, record, form);
    }
    columns.forEach(setValue);
    form?.setFieldsValue(values);
    forceUpdate({});

    return () => {
      form?.resetFields();
    };
  }, [record]);

  /**
   * FormItem Render
   */
  const renderFormItem = (column: IColumnProps<IRecord>) => {
    const {
      title,
      dataIndex,
      dataEntry = defaultDataEntry,
      layout: userLayout,
      submitFormItemProps: userFormItemProps = {},
      hideInSubmitForm = false,
    } = column;

    if (hideInSubmitForm) return null;

    const layout = { ...defaultLayout, ...userLayout };

    const userFormItemPropsFn =
      typeof userFormItemProps === 'function' ? userFormItemProps : () => userFormItemProps;

    const { shouldUpdate, dependencies } = userFormItemPropsFn(record, form!);

    const formItemProps = () => ({
      label: title,
      name: dataIndex,
      ...omit(userFormItemPropsFn(record, form!), ['shouldUpdate', 'dependencies']),
    });

    const formItem = () => (
      <FormItem {...layout.submitForm.formItem} {...formItemProps()}>
        {getInput<IRecord>(dataIndex, dataEntry, record, form)}
      </FormItem>
    );

    return (
      <Col key={String(dataIndex)} {...layout.submitForm.col}>
        {!!dependencies || !!shouldUpdate ? (
          <FormItem
            style={{ marginBottom: 0 }}
            dependencies={dependencies}
            shouldUpdate={shouldUpdate}
          >
            {formItem}
          </FormItem>
        ) : (
          formItem()
        )}
      </Col>
    );
  };

  return (
    <Form form={form} name="submit-form" {...restProps}>
      <Row gutter={0x10}>{columns.map(renderFormItem)}</Row>
    </Form>
  );
}

export default SubmitForm;