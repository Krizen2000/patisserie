import React from "react";
import { Route, Routes } from "react-router";
import CouponCreate from "./couponCreate/couponCreate";
import CouponEdit from "./couponEdit/couponEdit";
import CouponList from "./couponList/couponList";
import CouponView from "./couponView/couponView";

export default function CouponsTab() {
  return (
    <Routes>
      <Route path="/" element={<CouponList />} />
      <Route path="/create" element={<CouponCreate />} />
      <Route path="/edit/:selectedCoupon" element={<CouponEdit />} />
      <Route path="/view/:selectedCoupon" element={<CouponView />} />
    </Routes>
  );
}
