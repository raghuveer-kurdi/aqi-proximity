import React from "react";
import { Table } from "antd";
import Moment from "react-moment";
import { Aqi } from "../../Modals/Common";
import { findAqiBand } from "../../Utilities/aoiUtils";
const columns = [
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Current AQI",
    dataIndex: "aqi",
    key: "aqi",
    render: (text: string, record: Aqi) => {
      const aqiBand = findAqiBand(record.aqi);
      return {
        props: {
          style: { backgroundColor: aqiBand.color, textAlign: 'center' },
        },
        children: record.aqi,
      };
    },
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdated",
    key: "lastUpdated",
    render: (text: string) => <Moment fromNow>{text}</Moment>,
  },
];
const AoiTile = (props: { dataSource: Aqi[] }) => {
  return (
    <Table
      dataSource={props.dataSource}
      columns={columns}
      rowKey="city"
      pagination={false}
    />
  );
};

export default AoiTile;
