import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";

import {
  adminOrders as adminOrdersAction,
  deleteOrder,
} from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  // Delete order handler
  const deleteHandler = (e, id) => {
    e.currentTarget.disabled = true; // ensures correct button is disabled
    dispatch(deleteOrder(id));
  };

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
          <Link to={`/admin/order/${order._id}`}>
            <Button
              type="primary"
              style={{ marginRight: 8, background: "#d7263d" }}
            >
              <i className="fa fa-eye" />
            </Button>
          </Link>

          <Button onClick={(e) => deleteHandler(e, order._id)}>
            <i className="fa fa-trash" />
          </Button>
        </>
      ),
    },
  ];

  // Filter orders by search term (ID or status)
  const filteredOrders = adminOrders?.filter(
    (order) =>
      order._id?.toLowerCase().includes(search.toLowerCase()) ||
      order.orderStatus?.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch orders & handle errors/deletion
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
                placeholder="Search by Order ID or Status"
                allowClear
                enterButton
                size="large"
                style={{ marginBottom: 20, maxWidth: "400px" }}
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
                dataSource={filteredOrders}
                rowKey="_id"
                bordered
                pagination={{ pageSize: 10 }}
              />
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
