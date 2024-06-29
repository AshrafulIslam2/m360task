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
          className="w-full lg:w-[400px] lg:h-[400px] lg:m-4 h-auto rounded-lg object-cover border"
        />
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-3">{data?.title}</h1>
          <Card
            className="overflow-x-scroll md:overflow-hidden max-h-64 lg:max-h-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="flex  flex-col md:flex-row gap-4">
              <div className="flex max-w-xl">
                <div className="w-full  text-justify ">{data?.description}</div>
              </div>
              <div className="flex border  max-w-xs gap-3 rounded-md p-2 justify-between bg-teal-500 text-teal-950">
                <div>Price:</div>
                <div className="font-bold">${data?.price}</div>
              </div>
            </div>
          </Card>
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
