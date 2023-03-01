import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";

async function deleteProductDetails(productName) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  try {
    axiosInstance.delete(`/api/products/${productName}`);
  } catch (err) {
    console.log(err);
  }
}

export default function DeleteProductPopUp({
  selectedProduct,
  viewState,
  hidePopUp,
}) {
  const deleteData = async () => {
    await deleteProductDetails(selectedProduct);
    setTimeout(() => hidePopUp({ isDeleted: true }), 500);
  };

  return (
    <Modal backdrop="static" show={viewState} keyboard={false} centered>
      <Modal.Header closeButton onClick={hidePopUp}>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`Are you sure you want to delete Product(${selectedProduct})?`}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hidePopUp}>
          Close
        </Button>
        <Button variant="primary" onClick={deleteData}>
          <Trash />
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
