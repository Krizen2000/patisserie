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
import { loadCouponDetails } from "../couponEdit/couponEditHelper";
import DeleteCouponPopUp from "../deleteCouponPopUp";

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

export default function CouponView() {
  const [couponName, setCouponName] = useState("");
  const [couponDesc, setCouponDesc] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [couponMaxCap, setCouponMaxCap] = useState("");
  const [couponIsValid, setCouponIsValid] = useState(true);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const { selectedCoupon } = useParams();
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
    loadCouponDetails(selectedCoupon)
      .then((data) => {
        setCouponName(data.name);
        setCouponDesc(data.description);
        setCouponDiscount(data.discount);
        setCouponMaxCap(data.maxCap);
        setCouponIsValid(data.isValid);
      })
      .catch((err) => console.log(err));
  }, [selectedCoupon]);

  return (
    <>
      <DeleteCouponPopUp
        selectedCoupon={selectedCoupon}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="" style={{ padding: "0" }} onClick={prevView}>
            <ArrowLeft size={"2rem"} />
          </Button>
          <h3>View Coupon ({selectedCoupon})</h3>
        </div>
        <Form style={{ display: "grid", gap: ".5rem" }}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl type="text" disabled defaultValue={couponName} />
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
              defaultValue={couponDesc}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Discount</FormLabel>
            <FormControl type="text" disabled defaultValue={couponDiscount} />
            <FormText>Given as percentage with symbol(%)</FormText>
          </FormGroup>
          <FormGroup>
            <FormLabel>MaxCap</FormLabel>
            <FormControl type="text" disabled defaultValue={couponMaxCap} />
          </FormGroup>
          <FormGroup style={{ marginBottom: ".5rem" }}>
            <FormLabel>isValid</FormLabel>
            <FormSelect type="text" disabled defaultValue={couponIsValid}>
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
            <Button as={Link} to={`/admin/coupons/edit/${selectedCoupon}`}>
              <Pencil /> Edit
            </Button>
          </ButtonGroup>
        </Form>
      </BlockEnclosure>
    </>
  );
}
