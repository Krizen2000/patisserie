import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import styled from "styled-components";

async function verifyPromoCoupon(givenCoupon) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let coupon = null;
  try {
    const res = await axiosInstance.get(`/api/coupons/find/${givenCoupon}`);
    coupon = res.data;
    console.log("Coupon", coupon);
  } catch (err) {
    console.log(err);
  }

  return coupon ? [true, coupon] : [false, coupon];
}

const Container = styled.section`
  display: grid;
  align-items: baseline;
  margin: 0rem 1rem;
  padding: 4rem;
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
  background-color: var(--bs-white);
`;

const invalidCouponToast = {
  variant: "warning",
  title: "Invalid Coupon",
  message:
    "The Coupon given is not valid or expired. Please check the code carefully.",
};
export default function PromoSection({
  setPromoCode,
  setToastData,
  setShowToast,
}) {
  const [promoHolder, setPromoHolder] = useState("");
  const [isPromoLocked, setIsPromoLocked] = useState(false);

  const onUse = async () => {
    const [verified, coupon] = await verifyPromoCoupon(promoHolder);

    if (!verified) {
      setToastData(invalidCouponToast);
      setShowToast(true);
      return;
    }

    setPromoCode(coupon);
    setIsPromoLocked(true);
  };
  const onChange = () => {
    setPromoCode({ isValid: false });
    setIsPromoLocked(false);
  };
  return (
    <Container>
      <h3>Enter Promo Code:-</h3>
      <div className="d-flex" style={{ gap: "1rem" }}>
        <FormControl
          disabled={isPromoLocked}
          value={promoHolder}
          onChange={(e) => setPromoHolder(e.target.value)}
        />
        {isPromoLocked ? (
          <Button onClick={onChange}>Change</Button>
        ) : (
          <Button onClick={onUse}>Use</Button>
        )}
      </div>
    </Container>
  );
}
