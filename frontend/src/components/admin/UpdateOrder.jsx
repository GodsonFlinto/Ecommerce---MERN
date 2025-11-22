import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import {
  orderDetail as orderDetailAction,
  updateOrder,
} from "../../actions/orderActions";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );

  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;

  const [orderStatus, setOrderStatus] = useState("Processing");
  const [pageLoading, setPageLoading] = useState(true);

  const isPaid = paymentInfo.status === "succeeded";

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(orderDetailAction(orderId));
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, orderId]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("Order Updated Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      navigate("/admin/orders");
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }
  }, [isOrderUpdated, error, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder(orderId, { orderStatus }));
  };

  return (
    <Fragment>
      <MetaData title="Admin - Update Order" />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        {pageLoading || loading ? (
          <Loader />
        ) : (
          <div className="col-12 col-md-10">
            <Fragment>
              <div className="row d-flex justify-content-around">
                
                <div className="col-12 col-lg-8 mt-5 order-details">
                  <h1 className="my-5">Order # {orderDetail._id}</h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p><b>Name:</b> {user?.name}</p>
                  <p><b>Phone:</b> {shippingInfo?.phoneNo}</p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingInfo?.address}, {shippingInfo?.city},{" "}
                    {shippingInfo?.postalCode}, {shippingInfo?.state},{" "}
                    {shippingInfo?.country}
                  </p>
                  <p><b>Amount:</b> ${totalPrice}</p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className={isPaid ? "greenColor" : "redColor"}>
                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                  </p>

                  <h4 className="my-4">Order Status</h4>
                  <p className={orderStatus.includes("Delivered") ? "greenColor" : "redColor"}>
                    <b>{orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items</h4>
                  <hr />

                  <div className="cart-item my-1">
                    {orderItems.map((item) => (
                      <div className="row my-5" key={item.product}>
                        <div className="col-4 col-lg-2">
                          <img src={item.image} alt={item.name} height="45" width="65" />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Order Status</h4>
                  <select
                    className="form-control"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  <button
                    disabled={loading}
                    onClick={submitHandler}
                    className="btn btn-primary btn-block mt-3"
                  >
                    Update Status
                  </button>
                </div>

              </div>
            </Fragment>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateOrder;
