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
import { sendCouponDetails } from "./couponCreateHelper";

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

export default function CouponCreate() {
  const [couponName, setCouponName] = useState("");
  const [couponDesc, setCouponDesc] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [couponMaxCap, setCouponMaxCap] = useState("");
  const [couponIsValid, setCouponIsValid] = useState(true);
  const navigate = useNavigate();

  const prevView = () => navigate(-1);
  const sendCoupon = async () => {
    await sendCouponDetails(
      couponName,
      couponDesc,
      couponDiscount,
      couponMaxCap,
      couponIsValid
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
        <h3>Create Coupon</h3>
      </div>
      <Form style={{ display: "grid", gap: ".5rem" }}>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setCouponName(e.target.value)}
          />
          <FormText>Name must be unique</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl
            type="text"
            as="textarea"
            row={5}
            style={{ minHeight: "8.5rem" }}
            onChange={(e) => setCouponDesc(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Discount</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setCouponDiscount(e.target.value)}
          />
          <FormText>Given as percentage with symbol(%)</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>MaxCap</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setCouponMaxCap(e.target.value)}
          />
          <FormText>Maximum amount as discount by the given currency</FormText>
        </FormGroup>
        <FormGroup style={{ marginBottom: ".5rem" }}>
          <FormLabel>isValid</FormLabel>
          <FormSelect
            type="text"
            onChange={(e) => setCouponIsValid(e.target.value)}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </FormSelect>
        </FormGroup>
        <ButtonGroup style={{ gap: "2rem" }}>
          <Button type="reset" style={{ backgroundColor: "white" }}>
            Clear
          </Button>
          <Button onClick={sendCoupon}>Submit</Button>
        </ButtonGroup>
      </Form>
    </BlockEnclosure>
  );
}
