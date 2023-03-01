import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteProductPopUp from "../deleteProductPopUp";
import { loadAllProductsDetails } from "./productListHelper";

const BlockEnclosure = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 0.0625rem solid #c0c0c0;
  padding: 1.5rem;
  margin: 1.25rem;
  min-width: 80rem;
  background-color: var(--bs-white);
`;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);

  const [showDeletePopUp, hideDeletePopUp] = [
    (item) => {
      setDeletePopUp(true);
      setSelectedProduct(item.name);
    },
    () => {
      setSelectedProduct("");
      setDeletePopUp(false);
    },
  ];

  useEffect(() => {
    loadAllProductsDetails()
      .then((retrivedProducts) => setProducts(retrivedProducts))
      .catch((err) => console.log(err));
  }, [deletePopUp]);

  return (
    <>
      <DeleteProductPopUp
        selectedProduct={selectedProduct}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <h3>Products</h3>
        <Table striped style={{ border: "0.0625rem solid #c0c0c0" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Size</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, inx) => (
              <tr key={product.id}>
                <td>{inx + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.size.toString()}</td>
                <td>{product.price.toString()}</td>
                <td>{product.discount}</td>
                <td style={{ display: "flex", gap: "0.25rem" }}>
                  <Button
                    className="view-btn"
                    as={Link}
                    to={`/admin/products/view/${product.id}`}
                  >
                    <Eye />
                  </Button>
                  <Button
                    className="edit-btn"
                    as={Link}
                    to={`/admin/products/edit/${product.id}`}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="delete-btn"
                    as={Link}
                    onClick={() => showDeletePopUp(product)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button varient="primary" as={Link} to={`/admin/products/create`}>
          Create Product
        </Button>
      </BlockEnclosure>
    </>
  );
}
