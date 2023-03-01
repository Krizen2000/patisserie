import React from "react";
import styled from "styled-components";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  margin: 0rem 1rem;
  padding: 4rem 4rem;
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
  background-color: var(--bs-white);
  h2,
  hr {
    grid-column: span 2;
  }
`;

const GST_PERCENT = parseFloat(process.env.REACT_APP_GST_PERCENT);
const SHIPPING_CHARGE = parseFloat(process.env.REACT_APP_SHIPPING_CHARGE);

const calculateRetailSubTotal = (items) =>
  items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0.0);
const calculateDiscount = (items, promoCode) => {
  if (!promoCode.isValid && promoCode.discount != 0) {
    return 0.0;
  }

  const discountAmount =
    (calculateRetailSubTotal(items) * promoCode.discount) / 100.0;
  console.log("DiscountAmout: ", discountAmount);
  console.log(
    "Retail SubTotal: ",
    discountAmount > promoCode.maxCap ? promoCode.maxCap : discountAmount
  );
  return discountAmount > promoCode.maxCap ? promoCode.maxCap : discountAmount;
};
const calculateSubTotal = (items, promoCode) =>
  calculateRetailSubTotal(items) - calculateDiscount(items, promoCode);
const calculateGST = (items, promoCode) =>
  (calculateSubTotal(items, promoCode) * GST_PERCENT) / 100.0;
const calculateGrandTotal = (items, promoCode) =>
  calculateSubTotal(items, promoCode) +
  calculateGST(items, promoCode) +
  SHIPPING_CHARGE;
export default function BillSection({ items, promoCode }) {
  return (
    <Container>
      <h2>Bill</h2>
      <hr />
      <p>Retail SubTotal: </p>
      <p>₹{calculateRetailSubTotal(items, promoCode)}</p>
      {/* <p>₹{200}</p> */}
      <p>Discount: </p>
      <p>₹{calculateDiscount(items, promoCode)}</p>
      {/* <p>₹{201}</p> */}
      <p>SubTotal: </p>
      <p>₹{calculateSubTotal(items, promoCode)}</p>
      {/* <p>₹{100}</p> */}
      <p>GST: </p>
      <p>₹{calculateGST(items, promoCode)}</p>
      {/* <p>₹{122}</p> */}
      <p>Shipping Cost: </p>
      <p>₹{SHIPPING_CHARGE}</p>
      {/* <p>₹{231}</p> */}
      <hr />
      <h4>Grand Total: </h4>
      <b>₹{calculateGrandTotal(items, promoCode)}</b>
      {/* <h4>₹{552}</h4> */}
    </Container>
  );
}
