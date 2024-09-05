import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data));
      } else {
        // If user data fetch fails, clear the token and redirect
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      // Handle error, possibly redirect to login
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  // If user is being fetched, you might want to show a loader or similar
  return user ? children : <div>Loading...</div>;
};

export default ProtectedRoute;
