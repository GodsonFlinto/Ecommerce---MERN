import React, { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { Table, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const dispatch = useDispatch();

  const { userOrders, loading } = useSelector(state => state.orderState);

  useEffect(() => {
    dispatch(userOrdersAction());
  }, [dispatch]);

  const columns = [
    { title: "Order ID", dataIndex: "_id" },
    { 
      title: "Items", 
      dataIndex: "orderItems",
      render: (items) => items?.length 
    },
    { 
      title: "Amount", 
      dataIndex: "totalPrice",
      render: (price) => `₹${price}`
    },
    { 
      title: "Status", 
      dataIndex: "orderStatus",
      render: (status) => (
        <span style={{ color: status === "Delivered" ? "green" : "orange" }}>
          {status}
        </span>
      )
    },
    { 
      title: "Actions",
      render: (order) => (
        <Link to={`/order/${order._id}`}>
          <Button type="primary" size="small">View</Button>
        </Link>
      )
    }
  ];

  return (
    <Fragment>
      <MetaData title="My Orders" />
      <h1 className='mt-5'>My Orders</h1>

      <Table 
        className='px-3'
        columns={columns}
        dataSource={userOrders || [] }
        rowKey="_id"
        loading={loading}
        pagination
        bordered
      />
    </Fragment>
  );
};

export default UserOrders;
