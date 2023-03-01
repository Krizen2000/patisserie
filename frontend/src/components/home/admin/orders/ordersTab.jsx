import React from "react";
import OrderList from "./orderList/orderList";
import OrderCreate from "./orderCreate/orderCreate";
import OrderEdit from "./orderEdit/orderEdit";
import OrderView from "./orderView/orderView";
import { Route, Routes } from "react-router";

export default function OrdersTab() {
  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/create" element={<OrderCreate />} />
      <Route path="/edit/:selectedOrder" element={<OrderEdit />} />
      <Route path="/view/:selectedOrder" element={<OrderView />} />
    </Routes>
  );
}
