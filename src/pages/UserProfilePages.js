import React from "react";
import Navbar from "../components/Navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar>
      <h1>My Profile</h1>
        <UserProfile />
      </Navbar>
    </div>
  );
};

export default UserProfilePage;
