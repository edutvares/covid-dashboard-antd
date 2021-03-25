import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";

import "./App.css";
import { Layout, Menu, Space, Typography } from "antd";
import { PieChartOutlined, GlobalOutlined } from "@ant-design/icons";

import Map from "./pages/Map";
import Dashboard from "./pages/Dashboard";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

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
          setData({ global: Global, dataSource: Countries.sort((a,b) => b.TotalDeaths - a.TotalDeaths), loading: false });
        })
        .catch((error) => dataFetch());
    };
    dataFetch();
    console.log(data.global);
  }, []);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["/"]} mode="inline">
            <Menu.Item key="/" icon={<PieChartOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/map" icon={<GlobalOutlined />}>
              <Link to="/map">Map</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: "0 40px" }}
          >
            <Space align="center">
              <Typography.Title level={4}>Covid-19 Dashboard</Typography.Title>
            </Space>
          </Header>
          <Content style={{ margin: "16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route path="/map">
                  <Map data={data}/>
                </Route>
                <Route path="/">
                  <Dashboard data={data}/>
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
