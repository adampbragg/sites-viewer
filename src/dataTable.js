import { Table } from "antd";
import './dataTable.css';

export default function DataTable({ dataSet = [] }) {
  const columns = [
    {
      title: 'date',
      dataIndex: 'dateDisplay',
      key: 'date',
    },
    {
      title: 'weight',
      dataIndex: 'weightDisplay',
      key: 'weight',
    },
  ];
  const getReliabilityClassname = sample => sample.reliable ? '' : 'unreliable';
  return <Table dataSource={dataSet} columns={columns} rowClassName={getReliabilityClassname} />;
}