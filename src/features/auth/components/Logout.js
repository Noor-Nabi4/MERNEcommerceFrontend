import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync(userId));
  }, []);
  return <>{!userId && <Navigate to="/login" replace={true} />}</>;
};

export default Logout;
