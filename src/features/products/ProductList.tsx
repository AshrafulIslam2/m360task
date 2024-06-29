import React, { useState } from "react";
import { Table, Button } from "antd";

import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../api/apiSlice";

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });
  console.log("data", data);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text: string) => (
        <img src={text} alt="thumbnail" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Button type="primary">
          <Link to={`/products/${record.id}`}>View Details</Link>
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.toString()}</div>
      ) : (
        <Table
          columns={columns}
          dataSource={data?.products}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.total,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
        />
      )}
    </div>
  );
};

export default ProductList;
