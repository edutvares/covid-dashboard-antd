import { Card, Col, Row, Statistic, Table, Tag } from "antd";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Country",
    dataIndex: "Country",
    key: "Country",
  },
  {
    title: "TotalConfirmed",
    dataIndex: "TotalConfirmed",
    key: "TotalConfirmed",
    render: (TotalConfirmed) => (
      <Tag color="gold" key={TotalConfirmed}>
        {TotalConfirmed}
      </Tag>
    ),
  },
  {
    title: "TotalRecovered",
    dataIndex: "TotalRecovered",
    key: "TotalRecovered",
    render: (TotalRecovered) => (
      <Tag color="green" key={TotalRecovered}>
        {TotalRecovered}
      </Tag>
    ),
  },
  {
    title: "TotalDeaths",
    dataIndex: "TotalDeaths",
    key: "TotalDeaths",
    render: (TotalDeaths) => (
      <Tag color="red" key={TotalDeaths}>
        {TotalDeaths}
      </Tag>
    ),
  },
];

export default function Dashboard() {
  const [data, setData] = useState({
    dataSource: {},
    global: {},
    loading: true,
  });

  useEffect(() => {
    const dataFetch = async () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("https://api.covid19api.com/summary", requestOptions)
        .then((response) => response.json())
        .then(({ Global, Countries }) => {
          setData({ global: Global, dataSource: Countries, loading: false });
        })
        .catch((error) => console.log("error", error));
    };
    dataFetch();
    console.log(data.global);
  }, []);

  return (
    <>
      <Row gutter={16} size="16">
        <Col span={8}>
          <Card>
            <Statistic
              title="Cases"
              value={!data.loading ? data.global.TotalConfirmed : "--"}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Recovered"
              value={!data.loading ? data.global.TotalRecovered : "--"}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Deaths"
              value={!data.loading ? data.global.TotalDeaths : "--"}
              valueStyle={{ color: "#cf1322" }}
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
