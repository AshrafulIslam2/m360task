import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/products">Products</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Routes></Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2024 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
