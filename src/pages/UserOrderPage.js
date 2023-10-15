import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Navbar from "../components/Navbar/Navbar";

const UserOrderPages = () => {
  return (
    <div>
      <Navbar>
      <h1>My Orders</h1>
        <UserOrders />
      </Navbar>
    </div>
  );
};

export default UserOrderPages;
