import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import ProductList from "./features/products/ProductList";
import ProductDetail from "./features/products/ProductDetail";
import ProductEdit from "./features/products/ProductEdit";

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
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="h-screen flex justify-center items-center  text-sm lg:text-4xl font-bold">
                  Welcome to M360ICT
                </h1>
              }
            />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ashraful ©2024 Created by WD
      </Footer>
    </Layout>
  );
};

export default App;
