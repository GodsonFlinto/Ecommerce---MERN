import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productSlice";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../actions/productsActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { products = [], loading, error } = useSelector(
    (state) => state.productsState
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `$${value}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) => (
        <Fragment>
          <Link
            to={`/admin/product/${product._id}`}
            className="btn btn-primary"
          >
            <i className="fa fa-pencil"></i>
          </Link>
          <Button className="btn btn-danger ml-2">
            <i className="fa fa-trash"></i>
          </Button>
        </Fragment>
      ),
    },
  ];

  // 🔍 Filter products by name
  const filteredProducts = products?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Admin - Product List" />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Product List</h1>

          {loading ? (
            <Loader />
          ) : (
            <>
              <Input.Search
                placeholder="Search product by name"
                allowClear
                enterButton
                size="large"
                style={{ marginBottom: 20, maxWidth: "300px" }}
                onSearch={(value) => setSearch(value)}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Table
                columns={columns}
                dataSource={filteredProducts}
                rowKey="_id"
                bordered
                pagination
              />
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
