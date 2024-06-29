import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Card, Spin, Button } from "antd";
import { useGetProductByIdQuery } from "../api/apiSlice";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  if (error) {
    return <div>Error loading product details</div>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={data?.thumbnail}
          alt={data?.title}
          className="w-full h-auto rounded-lg object-cover border"
        />
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-3">{data?.title}</h1>
          <div
            className="overflow-x-scroll max-h-64 lg:max-h-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item
                label="Description"
                className="overflow-x-scroll"
              >
                {data?.description}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                ${data?.price}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <Button
            type="primary"
            onClick={() => navigate(`/products/${id}/edit`)}
            className="mt-5"
          >
            Edit Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
