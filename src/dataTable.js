import { Table } from "antd";
import { nanoid } from 'nanoid';

export default function DataTable({ dataSet = [] }) {
  dataSet.map(sample => {
    sample.key = nanoid();
    return sample;
  })
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
  ];
  return <Table dataSource={dataSet} columns={columns} />;
}