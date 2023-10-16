import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Protected({children}) {
  const [cookies, removeCookie] = useCookies([]);
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to="/login"  replace={true} />;
  }
  return children;
  // return children;
}

export default Protected;
