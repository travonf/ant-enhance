const List = {
  useList(record = {}) {
    return [{ getFieldValue: (key: string) => record[key], resetFields: () => {} }];
  },
};

export default List;
