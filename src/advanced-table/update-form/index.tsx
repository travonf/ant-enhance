import React from 'react';
import { Row, Col, Form } from 'antd';
import { omit } from '../../utils';
import getInput from '../../utils/get-form-input';
import getValue from '../../utils/get-form-value';
import { defaultLayout } from '../layouts';
import { defaultDataEntry } from '../profile';
import { IFormProps, IColumnProps, DataEntry } from '../typings';

const FormItem = Form.Item;

function UpdateForm<IRecord extends object = {}>(props: IFormProps<IRecord>) {
  const [, forceUpdate] = React.useState<object>();
  const { form, columns = [], record = {} as IRecord, ...restProps } = props;

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

  const renderFormItem = (column: IColumnProps<IRecord>) => {
    const {
      title,
      dataIndex,
      dataEntry = defaultDataEntry,
      layout: userLayout,
      formItemProps: userFormItemProps = {},
      hideInForm = false,
    } = column;

    if (hideInForm) return null;

    const layout = { ...defaultLayout, ...userLayout };

    const userFormItemPropsFn =
      typeof userFormItemProps === 'function' ? userFormItemProps : () => userFormItemProps;

    const { shouldUpdate, dependencies } = userFormItemPropsFn(record, form!);

    const formItemProps = () => ({
      label: title,
      name: dataIndex,
      // rules: [{ required: true, message: `${title}是必填项!` }],
      ...omit(userFormItemPropsFn(record, form!), ['shouldUpdate', 'dependencies']),
    });

    const formItem = () => (
      <FormItem {...layout.formItem} {...formItemProps()}>
        {getInput<IRecord>(dataIndex, dataEntry, record, form)}
      </FormItem>
    );

    return (
      <Col key={String(dataIndex)} {...layout.col}>
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
    <Form form={form} name="form_in_wrapper" {...restProps}>
      <Row gutter={0x10}>{columns.map(renderFormItem)}</Row>
    </Form>
  );
}

export default UpdateForm;
