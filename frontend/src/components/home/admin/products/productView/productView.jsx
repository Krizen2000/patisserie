import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
} from "react-bootstrap";
import { ArrowLeft, Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteProductPopUp from "../deleteProductPopUp";
import { loadProductDetails } from "./productViewHelper";

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

export default function ProductView() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSize, setProductSize] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productSpecial, setProductSpecial] = useState(false);
  const [deletedPopUp, setDeletePopUp] = useState(false);
  const { selectedProduct } = useParams();
  const navigate = useNavigate();

  const prevView = () => navigate(-1);
  const [showDeletePopUp, hideDeletePopUp] = [
    () => setDeletePopUp(true),
    (item) => {
      setDeletePopUp(false);
      if (item.isDeleted) prevView();
    },
  ];

  useEffect(() => {
    loadProductDetails(selectedProduct)
      .then((data) => {
        setProductId(data.id);
        setProductName(data.name);
        setProductDesc(data.description);
        setProductImageUrl(data.image);
        setProductCategory(data.category);
        setProductSize(data.size);
        setProductPrice(data.price);
        setProductDiscount(data.discount);
        setProductSpecial(data.special);
      })
      .catch((err) => console.log(err));
  }, [selectedProduct]);

  return (
    <>
      <DeleteProductPopUp
        selectedProduct={selectedProduct}
        viewState={deletedPopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="none" style={{ padding: "0" }} onClick={prevView}>
            <ArrowLeft size={"2rem"} />
          </Button>
          <h3>View Product ({selectedProduct})</h3>
        </div>
        <Form style={{ display: "grid", gap: ".5rem" }}>
          <FormGroup>
            <FormLabel>ID</FormLabel>
            <FormControl type="text" disabled value={productId} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl type="text" disabled value={productName} />
            <FormText>Name must be unique</FormText>
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl
              type="text"
              as="textarea"
              row={5}
              style={{ minHeight: "8.5rem" }}
              disabled
              value={productDesc}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Image</FormLabel>
            <FormControl type="text" disabled value={productImageUrl} />
            <FormText>URL of the new product</FormText>
          </FormGroup>
          <FormGroup>
            <FormLabel>Category</FormLabel>
            <FormControl type="text" disabled value={productCategory} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Size</FormLabel>
            <FormControl type="text" disabled value={productSize} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Price</FormLabel>
            <FormControl type="text" disabled value={productPrice} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Discount</FormLabel>
            <FormControl type="text" disabled value={productDiscount} />
          </FormGroup>
          <FormGroup style={{ marginBottom: ".5rem" }}>
            <FormLabel>Special Tag</FormLabel>
            <FormSelect value={productSpecial} disabled>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </FormSelect>
          </FormGroup>
          <ButtonGroup style={{ gap: "2rem" }}>
            <Button
              style={{ backgroundColor: "white" }}
              onClick={showDeletePopUp}
            >
              <Trash /> Delete
            </Button>
            <Button as={Link} to={`/admin/products/edit/${selectedProduct}`}>
              <Pencil /> Edit
            </Button>
          </ButtonGroup>
        </Form>
      </BlockEnclosure>
    </>
  );
}
