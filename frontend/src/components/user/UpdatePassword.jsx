import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  updatePassword as updatePasswordAction,
} from "../../actions/userActions";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const { isUpdated, error } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // const formData = new FormData()
    // formData.append('oldPassword', oldPassword)
    // formData.append('password',password)

    const data = { oldPassword, password };

    dispatch(updatePasswordAction(data));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password Updated Successfully", {
        type: "success",
        position: "bottom-center",
      });

      setOldPassword("");
      setPassword("");
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
  }, [isUpdated, error, dispatch]);

  return (
    <Fragment>
      <MetaData title={`Update Password`} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                name="old-password"
                autoComplete="current-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                hidden
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                name="new-password"
                className="form-control"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
