import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthInfo, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthInfo);
  useEffect(() => {
    dispatch(signOutAsync(user));
  }, []);
  return <>{!user && <Navigate to="/login" replace={true} />}</>;
};

export default Logout;
