import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../actions/productsActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { products = [], loading, error } = useSelector(
    (state) => state.productsState
  );
  const { error : productError, isProductDeleted } = useSelector(
    (state) => state.productState
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
          <Link to={`/admin/user/${product._id}`}>
                      <Button type="primary" style={{ marginRight: 8, background: "#d7263d" }} >
                        <i className="fa fa-eye" />
                      </Button>
                    </Link>
          
                    <Button
                      
                      onClick={(e) => deleteHandler(e, product._id)}
                    >
                      <i className="fa fa-trash" />
                    </Button>
        </Fragment>
      ),
    },
  ];

  const filteredProducts = products?.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteHandler = (e, id) => {
    e.target.disabled = true
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if (error || productError) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }
    if(isProductDeleted){
      toast("Product Deleted Successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }
    

    dispatch(getAdminProducts());
  }, [dispatch, error, isProductDeleted]);

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
                value={search}
                onSearch={(value) => setSearch(value)}
                onChange={(e) => setSearch(e.target.value)}
              />
              <style>{`
    .ant-input-search-button {
      background-color: #dc3545 !important;
      border-color: #dc3545 !important;
    }
    .ant-input-search-button:hover {
      background-color: #c82333 !important;
      border-color: #bd2130 !important;
    }
  `}</style>

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
