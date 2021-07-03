import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Dashboard from "../Pages/Dashboard/Dashboard";
import "antd/dist/antd.css";
import "./VanillaLayout.css";
import CError from "../Boundries/CError";
const { Header, Content } = Layout;

type Props = { children?: React.ReactNode };

export default (props: Props) => {
  return (
    <CError>
      <Layout className="layout">
        <BrowserRouter>
          <Header>
            <div className="logo">AQI</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item>
                <Link to="/">Home</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/">
                  <Dashboard />
                </Route>
              </Switch>
            </div>
          </Content>
        </BrowserRouter>
      </Layout>
    </CError>
  );
};
