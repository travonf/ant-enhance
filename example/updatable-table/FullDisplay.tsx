/**
 * title: 能力展示
 * desc: 演示基础功能、高级功能，早点回家吃饭。
 */
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { UpdatableTable as Table } from 'ant-enhance';
import { delay } from 'ant-enhance/es/utils';
import { IRecord } from './typings';
import { getData } from './services';
import columns from './columns';
import styles from './index.less';

const App: React.FC<any> = () => {
  const [value, setValue] = useState([] as IRecord[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function query() {
      setLoading(true);
      const resp = await getData();
      setValue(resp?.data);
      await delay(2000);
      setLoading(false);
    })();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Table<IRecord>
        wrapper={(record: IRecord) => ({
          view: {
            type: 'Modal',
            title: record.Text,
            width: '80vw',
          },
          edit: {
            type: 'Drawer',
            title: record.Text,
            width: '60vw',
          },
        })}
        size="large"
        rowKey="id"
        columns={columns}
        dataSource={value}
        expandable={{
          rowExpandable: (record: IRecord) => record.InputNumber > 50,
          expandedRowRender: (record: IRecord) => (
            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'keep-all',
              }}
            >
              {record.TextArea}
            </pre>
          ),
        }}
        loading={loading}
        scroll={{ x: 4200 }}
        pagination={false}
        onUpdate={async (record: IRecord) => {
          console.log(record);
          message.loading('正在更新', 2);
          await delay(2000);
          message.success('更新成功');
        }}
        onDelete={async (record: IRecord) => {
          console.log(record);
          message.loading('正在删除', 2);
          await delay(2000);
          message.success('删除成功');
        }}
      />
    </div>
  );
};

export default App;
