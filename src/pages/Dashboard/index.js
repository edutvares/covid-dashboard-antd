import { Card, Col, Row, Statistic, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {MehOutlined, SmileOutlined, FrownOutlined} from "@ant-design/icons"
import { useLocation } from "react-router-dom"

const columns = [
  {
    title: "Country",
    dataIndex: "Country",
    key: "Country",
  },
  {
    title: "Total Confirmed",
    dataIndex: "TotalConfirmed",
    key: "TotalConfirmed",
    render: (TotalConfirmed) => (
      <Tag color="gold" key={TotalConfirmed}>
        {TotalConfirmed}
      </Tag>
    ),
  },
  {
    title: "Total Recovered",
    dataIndex: "TotalRecovered",
    key: "TotalRecovered",
    render: (TotalRecovered) => (
      <Tag color="green" key={TotalRecovered}>
        {TotalRecovered}
      </Tag>
    ),
  },
  {
    title: "Total Deaths",
    dataIndex: "TotalDeaths",
    key: "TotalDeaths",
    render: (TotalDeaths) => (
      <Tag color="red" key={TotalDeaths}>
        {TotalDeaths}
      </Tag>
    ),
  },
];

export default function Dashboard({data}) {
  return (
    <>
      <Row gutter={16} size="16">
        <Col span={8}>
          <Card>
            <Statistic
              title="Cases"
              value={!data.loading ? data.global.TotalConfirmed : "--"}
              valueStyle={{ color: "gold" }}
              prefix={<MehOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Recovered"
              value={!data.loading ? data.global.TotalRecovered : "--"}
              valueStyle={{ color: "#3f8600" }}
              prefix={<SmileOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Deaths"
              value={!data.loading ? data.global.TotalDeaths : "--"}
              valueStyle={{ color: "#cf1322" }}
              prefix={<FrownOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Table
        style={{ marginTop: "16px" }}
        columns={columns}
        dataSource={!data.loading && data.dataSource}
        loading={data.loading}
      />
    </>
  );
}
