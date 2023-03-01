import React, { useState } from "react";
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
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { sendProductDetails } from "./productCreateHelper";

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

export default function ProductCreate() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSize, setProductSize] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productSpecial, setProductSpecial] = useState(false);
  const navigate = useNavigate();

  const prevView = () => navigate(-1);
  const sendProduct = async () => {
    await sendProductDetails(
      productId,
      productName,
      productDesc,
      productImageUrl,
      productCategory,
      productSize,
      productPrice,
      productDiscount
    );
    setTimeout(() => null, 500);
    prevView();
  };

  return (
    <BlockEnclosure>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="" style={{ padding: "0" }} onClick={prevView}>
          <ArrowLeft size={"2rem"} />
        </Button>
        <h3>Create Product</h3>
      </div>
      <Form style={{ display: "grid", gap: ".5rem" }}>
        <FormGroup>
          <FormLabel>ID</FormLabel>
          <FormControl
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <FormText>Name must be unique</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl
            type="text"
            as="textarea"
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
            rows={5}
            style={{ minHeight: "8.5rem" }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Image</FormLabel>
          <FormControl
            type="text"
            value={productImageUrl}
            onChange={(e) => setProductImageUrl(e.target.value)}
          />
          <FormText>URL of the new product</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Category</FormLabel>
          <FormControl
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Size</FormLabel>
          <FormControl
            type="text"
            defaultValue={productSize}
            onChange={(e) => setProductSize(e.target.value.split(","))}
          />
          <FormText>Seperate Multiple Entries via comma(,)</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Price</FormLabel>
          <FormControl
            type="text"
            defaultValue={productPrice}
            onChange={(e) => setProductPrice(e.target.value.split(","))}
          />
          <FormText>Seperate Multiple Entries via comma(,)</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Discount</FormLabel>
          <FormControl
            type="number"
            value={productDiscount}
            onChange={(e) => setProductDiscount(e.target.value)}
          />
          <FormText>Seperate Multiple Entries via comma(,)</FormText>
        </FormGroup>
        <FormGroup style={{ marginBottom: ".5rem" }}>
          <FormLabel>Special Tag</FormLabel>
          <FormSelect
            value={productSpecial}
            onChange={(e) => setProductSpecial(e.target.value)}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </FormSelect>
        </FormGroup>
        <ButtonGroup style={{ gap: "2rem" }}>
          <Button type="reset" style={{ backgroundColor: "white" }}>
            Clear
          </Button>
          <Button onClick={sendProduct}>Submit</Button>
        </ButtonGroup>
      </Form>
    </BlockEnclosure>
  );
}
