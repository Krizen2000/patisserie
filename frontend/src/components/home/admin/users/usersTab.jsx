import React from "react";
import { Route, Routes } from "react-router";
import UserCreate from "./userCreate/userCreate";
import UserEdit from "./userEdit/userEdit";
import UserList from "./userList/userList";
import UserView from "./userView/userView";

export default function UsersTab() {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/create" element={<UserCreate />} />
      <Route path="/edit/:selectedUser" element={<UserEdit />} />
      <Route path="/view/:selectedUser" element={<UserView />} />
    </Routes>
  );
}
