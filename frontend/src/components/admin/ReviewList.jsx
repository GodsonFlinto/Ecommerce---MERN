import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Button, Input } from "antd";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import { deleteReview, getReviews } from "../../actions/productsActions";

const ReviewList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const {
    reviews = [],
    loading = false,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);
  const [productId, setProductId] = useState("");

  // Delete handler
  const deleteHandler = (e, id) => {
    e.currentTarget.disabled = true; // ensures correct button is disabled
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "User",
      key: "user",
      render: (_, review) => review.user?.name,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, review) => (
        <>
          <Button danger onClick={(e) => deleteHandler(e, review._id)}>
            <i className="fa fa-trash" />
          </Button>
        </>
      ),
    },
  ];

  // Filter users by search
  const filteredReviews = reviews?.filter(
    (review) =>
      review?._id.toLowerCase().includes(search.toLowerCase()) ||
      review?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      review?.comment?.toLowerCase().includes(search.toLowerCase())
  );

  // useEffect for error/success handling & fetching users
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
      return
    }

    if (isReviewDeleted) {
      toast.success("Review Deleted Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));
      return
    }
  }, [dispatch, error, isReviewDeleted]);

  return (
    <Fragment>
      <MetaData title="Admin - Users List" />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">All Reviews</h1>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="row justify-content-center mt-5">
                <div className="col-5">
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label>Product ID</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setProductId(e.target.value)}
                        value={productId}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-block py-2"
                    >
                      Get Reviews
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-5">
                <Input.Search
                  placeholder="Search by ID, User or Comment"
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
                  dataSource={filteredReviews}
                  rowKey="_id"
                  bordered
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ReviewList;
