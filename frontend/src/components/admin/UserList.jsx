import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";

import { clearError, clearUserDeleted } from "../../slices/userSlice";
import { deleteUser, getUsers } from "../../actions/userActions";

const UserList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { users = [], loading = true, error, isUserDeleted } = useSelector(
    (state) => state.userState
  );

  // Delete handler
  const deleteHandler = (e, id) => {
    e.currentTarget.disabled = true; // ensures correct button is disabled
    dispatch(deleteUser(id));
  };

  // Table columns
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <>
          <Link to={`/admin/user/${user._id}`}>
            <Button type="primary" style={{ marginRight: 8 }}>
              <i className="fa fa-eye" />
            </Button>
          </Link>

          <Button
            danger
            onClick={(e) => deleteHandler(e, user._id)}
          >
            <i className="fa fa-trash" />
          </Button>
        </>
      ),
    },
  ];

  // Filter users by search
  const filteredUsers = users?.filter(
    (user) =>
      user._id.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // useEffect for error/success handling & fetching users
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isUserDeleted) {
      toast.success("User Removed Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUserDeleted()),
      });
    }

    dispatch(getUsers());
  }, [dispatch, error, isUserDeleted]);

  return (
    <Fragment>
      <MetaData title="Admin - Users List" />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">All Users</h1>

          {loading ? (
            <Loader />
          ) : (
            <>
              <Input.Search
                placeholder="Search by ID, Name or Email"
                allowClear
                enterButton
                size="large"
                style={{ marginBottom: 20, maxWidth: "400px" }}
                value={search}
                onSearch={(value) => setSearch(value)}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Table
                columns={columns}
                dataSource={filteredUsers}
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

export default UserList;
