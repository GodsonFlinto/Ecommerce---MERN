import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, resetPassword } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, error } = useSelector((state) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useParams()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, confirmPassword, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("Password resetted successfully", {
        type: "success",
        position: "bottom-center",
      });
      navigate("/");
      return;
    }
    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  return (
    <Fragment>
        <MetaData title={`Reset Password`} />
         <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              autoComplete="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
          style={{
            background: "#d7263d",
          }}
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
    </Fragment>
   
  );
};

export default ResetPassword;
