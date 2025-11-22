import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";

import { adminOrders as adminOrdersAction, deleteOrder } from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted
  } = useSelector((state) => state.orderState);

  // Table columns
  const columns = [
  {
    title: "Order ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "No. of Items",
    dataIndex: "orderItems",
    key: "orderItems",
    render: (items) => items?.length || 0,
  },
  {
    title: "Amount",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (v) => `₹${v}`,
  },
  {
    title: "Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (status) => (
      <span style={{ color: status === "Delivered" ? "green" : "red" }}>
        {status}
      </span>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, order) => (
      <>
        <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
          <i className="fa fa-eye" />
        </Link>

        <Button
          onClick={(e) => deleteHandler(e, order._id)}
          className="btn btn-danger ml-2"
        >
          <i className="fa fa-trash" />
        </Button>
      </>
    ),
  },
];


  // Search filter
  const filteredOrders = adminOrders?.filter((item) =>
    item._id.toLowerCase().includes(search.toLowerCase())
  );

  // Delete order
  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderDeleted()),
      });
    }

    dispatch(adminOrdersAction());

  }, [dispatch, error, isOrderDeleted]);

  return (
    <Fragment>
      <MetaData title="Admin - Orders List" />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">All Orders</h1>

          {loading ? (
            <Loader />
          ) : (
            <>
              <Input.Search
                placeholder="Search by Order ID"
                allowClear
                enterButton
                size="large"
                style={{ marginBottom: 20, maxWidth: "350px" }}
                value={search}
                onSearch={(value) => setSearch(value)}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Table
                columns={columns}
                dataSource={filteredOrders}
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

export default OrderList;
