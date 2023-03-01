import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ArrowLeft } from "react-bootstrap-icons";
import styled from "styled-components";
import { loadCouponDetails, modifyCouponDetails } from "./couponEditHelper";
import { useNavigate, useParams } from "react-router";

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

export default function CouponEdit() {
  const [couponName, setCouponName] = useState("");
  const [couponDesc, setCouponDesc] = useState("");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [couponMaxCap, setCouponMaxCap] = useState("");
  const [couponIsValid, setCouponIsValid] = useState(true);
  const { selectedCoupon } = useParams();
  const navigate = useNavigate();

  const prevView = () => navigate(-1);
  const modifyCoupon = async () => {
    await modifyCouponDetails(
      selectedCoupon,
      couponName,
      couponDesc,
      couponDiscount,
      couponMaxCap,
      couponIsValid
    );
    setTimeout(() => null, 500);
    prevView();
  };

  useEffect(() => {
    loadCouponDetails(selectedCoupon)
      .then((data) => {
        console.log(data);
        setCouponName(data.name);
        setCouponDesc(data.description);
        setCouponDiscount(data.discount);
        setCouponMaxCap(data.maxCap);
        setCouponIsValid(data.isValid);
      })
      .catch((err) => console.log(err));
  }, [selectedCoupon]);

  return (
    <BlockEnclosure>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="" style={{ padding: "0" }} onClick={prevView}>
          <ArrowLeft size={"2rem"} />
        </Button>
        <h3>Edit Coupon</h3>
      </div>
      <Form style={{ display: "grid", gap: ".5rem" }}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={couponName}
            onChange={(e) => setCouponName(e.target.value)}
          />
          <Form.Text>Name must be unique</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            row={5}
            style={{ minHeight: "8.5rem" }}
            onChange={(e) => setCouponDesc(e.target.value)}
            defaultValue={couponDesc}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            defaultValue={couponDiscount}
            onChange={(e) => setCouponDiscount(e.target.value)}
          />
          <Form.Text>Given as percentage with symbol(%)</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>MaxCap</Form.Label>
          <Form.Control
            type="text"
            defaultValue={couponMaxCap}
            onChange={(e) => setCouponMaxCap(e.target.value)}
          />
          <Form.Text>
            Maximum amount as discount by the given currency
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ marginBottom: ".5rem" }}>
          <Form.Label>isValid</Form.Label>
          <Form.Select defaultValue={couponDiscount}>
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        </Form.Group>
        <ButtonGroup style={{ gap: "2rem" }}>
          <Button type="reset" style={{ backgroundColor: "white" }}>
            Clear
          </Button>
          <Button onClick={modifyCoupon}>Save</Button>
        </ButtonGroup>
      </Form>
    </BlockEnclosure>
  );
}
