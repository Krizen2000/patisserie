import React from "react";
import { Route, Routes } from "react-router";
import OrderListing from "../components/orders/orderListing";
import OrderView from "../components/orders/orderView";

export default function Orders() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<OrderListing />} />
        <Route path="/:orderId" element={<OrderView />} />
      </Route>
    </Routes>
  );
}
