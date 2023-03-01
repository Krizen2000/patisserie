import React from "react";
import { Route, Routes } from "react-router";
import ProductCreate from "./productCreate/productCreate";
import ProductEdit from "./productEdit/productEdit";
import ProductList from "./productList/productList";
import ProductView from "./productView/productView";

export default function ProductsTab() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/create" element={<ProductCreate />} />
      <Route path="/edit/:selectedProduct" element={<ProductEdit />} />
      <Route path="/view/:selectedProduct" element={<ProductView />} />
    </Routes>
  );
}
