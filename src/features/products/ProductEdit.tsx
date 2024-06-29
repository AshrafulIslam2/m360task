import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from "../api/apiSlice";
import { Form, Input, Button, Select, Card, Spin, message } from "antd";

const { Option } = Select;

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useGetProductByIdQuery(Number(id));
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await updateProduct({ id: Number(id), ...values }).unwrap();
      message.success("Product updated successfully!");
      console.log(values);
      navigate(`/products/${id}`);
    } catch (error) {
      message.error("Failed to update product");
    }
  };

  if (productLoading || categoriesLoading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  if (productError || categoriesError) {
    return <div>Error loading product details or categories</div>;
  }

  // Initialize reviews with correct structure
  const initialReviews =
    product?.reviews?.map((review: any, index: number) => ({
      ...review,
      key: index,
    })) || [];
  const formattedCategories = categories?.map((category: any) => ({
    name: category.name,
  }));

  return (
    <div className="lg:p-5 max-w-4xl mx-auto">
      <Card title={`Edit Product: ${product?.title}`}>
        <Form
          form={form}
          initialValues={{
            title: product?.title,
            description: product?.description,
            price: product?.price,
            category: product?.category,
            reviews: initialReviews,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {formattedCategories?.map((category) => (
                <Option key={category.name} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key} style={{ display: "flex", alignItems: "end" }}>
                    <Form.Item
                      {...restField}
                      name={[name, "content"]}
                      fieldKey={[fieldKey!, "content"]} // Ensure fieldKey is not undefined
                      label="Review"
                      rules={[
                        { required: true, message: "Missing review content" },
                      ]}
                      className="flex-1 mr-2 mb-0"
                    >
                      <Input.TextArea />
                    </Form.Item>
                    <Button
                      type="text"
                      onClick={() => remove(name)}
                      className="mb-0 bg-purple-500 text-white font-bold"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    className="mt-3"
                    style={{ borderColor: "#1890ff", color: "#1890ff" }}
                  >
                    Add Review
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={"bg-purple-500 "}
              loading={updateLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductEdit;
