import React from "react";
import { Route, Routes } from "react-router";
import styled from "styled-components";
import CouponsTab from "../components/home/admin/coupons/couponsTab";
import OrdersTab from "../components/home/admin/orders/ordersTab";
import ProductsTab from "../components/home/admin/products/productsTab";
import ReviewsTab from "../components/home/admin/reviews/reviewsTab";
import UsersTab from "../components/home/admin/users/usersTab";

const Container = styled.div`
  display: grid;
  margin: 1.5rem 5rem;
  padding: 1.5rem 5rem;
`;

export default function Admin() {
  return (
    <Container>
      <Routes>
        <Route path="/products/*" element={<ProductsTab />} />
        <Route path="/coupons/*" element={<CouponsTab />} />
        <Route path="/users/*" element={<UsersTab />} />
        <Route path="/reviews/*" element={<ReviewsTab />} />
        <Route path="/orders/*" element={<OrdersTab />} />
      </Routes>
    </Container>
  );
}
