import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../layouts/Loader";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );

  const {user : authUser} = useSelector((state) => state.authState);

  // Populate form when user data is fetched
  useEffect(() => {
    if (user?._id) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
    }
  }, [user]);

  // Fetch user
  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  // Handle success/error notifications
  useEffect(() => {
    if (isUserUpdated) {
      toast.success("User Updated Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUserUpdated()),
      });
      navigate("/admin/users");
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }
  }, [isUserUpdated, error, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);

    dispatch(updateUser(userId, formData));
  };

  return (
    <Fragment>
      <MetaData title="Admin - Update User" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="col-12 col-md-10">
            <div className="wrapper my-5">
              <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
                <h1 className="mb-4">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>
                  <select
                  disabled = {user._id === authUser._id}
                    id="role_field"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  id="update_button"
                  type="submit"
                  disabled={loading}
                  className="btn btn-block py-3"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateUser;
