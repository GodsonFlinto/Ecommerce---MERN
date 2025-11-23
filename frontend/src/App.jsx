import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/product/ProductDetail";
import { HelmetProvider } from "react-helmet-async";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/login";
import Register from "./components/user/Register";
import store from './store';
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetail from "./components/order/OrderDetail";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser);

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="app">
        <HelmetProvider>

          <Header />
          <ToastContainer theme="dark" />

          {/* ALL ROUTES IN ONE PLACE */}
          <Routes>

            {/* USER ROUTES INSIDE CONTAINER */}
            <Route
              path="/"
              element={
                <div className="container container-fluid">
                  <Home />
                </div>
              }
            />

            <Route
              path="/product/:id"
              element={
                <div className="container container-fluid">
                  <ProductDetail />
                </div>
              }
            />

            <Route
              path="/search/:keyword"
              element={
                <div className="container container-fluid">
                  <ProductSearch />
                </div>
              }
            />

            <Route
              path="/login"
              element={
                <div className="container container-fluid">
                  <Login />
                </div>
              }
            />

            <Route
              path="/register"
              element={
                <div className="container container-fluid">
                  <Register />
                </div>
              }
            />

            <Route
              path="/myprofile"
              element={
                <div className="container container-fluid">
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </div>
              }
            />

            <Route
              path="/myprofile/update"
              element={
                <div className="container container-fluid">
                  <UpdateProfile />
                </div>
              }
            />

            <Route
              path="/myprofile/update/password"
              element={
                <div className="container container-fluid">
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                </div>
              }
            />

            <Route
              path="/password/forgot"
              element={
                <div className="container container-fluid">
                  <ForgotPassword />
                </div>
              }
            />

            <Route
              path="/password/reset/:token"
              element={
                <div className="container container-fluid">
                  <ResetPassword />
                </div>
              }
            />

            <Route
              path="/cart"
              element={
                <div className="container container-fluid">
                  <Cart />
                </div>
              }
            />

            <Route
              path="/shipping"
              element={
                <div className="container container-fluid">
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                </div>
              }
            />

            <Route
              path="/order/confirm"
              element={
                <div className="container container-fluid">
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                </div>
              }
            />

            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <div className="container container-fluid">
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  </div>
                }
              />
            )}

            <Route
              path="/order/success"
              element={
                <div className="container container-fluid">
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                </div>
              }
            />

            <Route
              path="/orders"
              element={
                <div className="container container-fluid">
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                </div>
              }
            />

            <Route
              path="/order/:id"
              element={
                <div className="container container-fluid">
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                </div>
              }
            />

            {/* -------------------- ADMIN ROUTES -------------------- */}

            <Route path="/admin/dashboard"
              element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}
            />

            <Route path="/admin/products"
              element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>}
            />

            <Route path="/admin/products/create"
              element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>}
            />

            <Route path="/admin/product/:id"
              element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>}
            />

            <Route path="/admin/orders"
              element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>}
            />

            <Route path="/admin/order/:id"
              element={<ProtectedRoute isAdmin={true}><UpdateOrder /></ProtectedRoute>}
            />

            <Route path="/admin/users"
              element={<ProtectedRoute isAdmin={true}><UserList /></ProtectedRoute>}
            />

            <Route path="/admin/user/:id"
              element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>}
            />

            <Route path="/admin/reviews"
              element={<ProtectedRoute isAdmin={true}><ReviewList /></ProtectedRoute>}
            />

          </Routes>

          <Footer />

        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
