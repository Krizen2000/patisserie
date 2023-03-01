import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

async function getOrderData(orderId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let order = {};
  try {
    const res = await axiosInstance.get(`/api/orders/find/${orderId}`);
    order = res.data;
    console.log("Order Data:", res.data);
  } catch (err) {
    console.log(err);
    return {};
  }
  return order;
}

async function getProductData(productId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let product = {};
  try {
    const res = await axiosInstance.get(`/api/products/find/${productId}`);
    product = res.data;
    console.log("Product Data", res.data);
  } catch (err) {
    console.log(err);
    return {};
  }
  return product;
}

const Col = styled.div`
  display: grid;
  gap: 1rem;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const Container = styled.section`
  display: grid;
  gap: 2rem;
  margin: 2rem;
  padding: 2rem;
`;

const TransactionSection = styled.section`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  margin: 0rem 6rem;
  justify-content: space-around;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;
const ContentSection = styled.section`
  display: grid;
  gap: 1rem;
  padding: 2rem;
  margin: 0rem 6rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

const initialOrder = {
  modifiedAt: 0,
  createdAt: 0,
  paymentMethod: "",
  shippingCharge: 0,
  coupon: { discount: 0, name: "", maxCap: 0 },
  items: [{ productName: "", size: "", price: 0, quantity: 0 }],
  address: { street: "", city: "", pincode: "", state: "" },
};
export default function OrderView() {
  const [order, setOrder] = useState(initialOrder);
  // const [order, setOrder] = useState(loadData()[0]);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const calculateItemTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const calculateSubTotal = (items, shippingCharge) =>
    calculateItemTotal(items) + shippingCharge;

  const calculateDiscount = (items, shippingCharge, coupon) => {
    let discountAmount =
      (calculateSubTotal(items, shippingCharge) * coupon.discount) / 100;
    if (discountAmount > coupon.maxCap) discountAmount = coupon.maxCap;
    return discountAmount;
  };

  const calculateTotal = (items, shippingCharge, coupon) => {
    const subTotal = calculateSubTotal(items, shippingCharge);
    const discountAmount = calculateDiscount(items, shippingCharge, coupon);
    return subTotal - discountAmount;
  };

  useEffect(() => {
    const dataLoader = async () => {
      const orderData = await getOrderData(orderId);
      const modifiedItems = await Promise.all(
        orderData.items.map(async (item) => {
          const itemData = await getProductData(item.productId);
          const { image, name } = itemData;
          return { ...item, image, name };
        })
      );
      const modifiedOrderData = { ...orderData, items: modifiedItems };
      console.log("Order Data:", orderData);
      console.log("ModifiedItems: ", modifiedItems);
      console.log("ModifiesOrder:", modifiedOrderData);
      setOrder(modifiedOrderData);
    };
    dataLoader();
    return () => {};
  }, [orderId]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <Button variant="none" onClick={() => navigate(-1)}>
          <ArrowLeft size="3rem" />
        </Button>
        <h1>Order Details</h1>
      </div>
      <Row style={{ margin: "1rem" }}>
        <h5>
          {"Ordered on "}
          <time dateTime={new Date(order.createdAt).toISOString()}>
            {new Date(order.createdAt).toDateString()}
          </time>
        </h5>
        <div class="vr" />
        <h5>Order # {order._id}</h5>
      </Row>
      <TransactionSection>
        <Col style={{ alignContent: "baseline", gap: ".25rem" }}>
          <h3>Shipping Address</h3>
          <address>
            <p>Street: {order.address.street}</p>
            <p>City: {order.address.city}</p>
            <p>Pincode: {order.address.pincode}</p>
            <p>State: {order.address.state}</p>
          </address>
        </Col>
        <Col
          style={{
            justifyContent: "center",
            alignContent: "baseline",
            gap: ".25rem",
          }}
        >
          <h3>Payment Method</h3>
          <p>{order.paymentMethod}</p>
        </Col>
        <Col style={{ alignContent: "baseline", gap: ".25rem" }}>
          <h3>Order Summary</h3>
          <p>Items: ₹ {calculateItemTotal(order.items)}</p>
          <p>Shipping: ₹ {order.shippingCharge}</p>
          <p>
            SubTotal: ₹ {calculateSubTotal(order.items, order.shippingCharge)}
          </p>
          <p>
            Discount: ₹{" "}
            {calculateDiscount(order.items, order.shippingCharge, order.coupon)}
          </p>
          <p>
            Total: ₹{" "}
            {calculateTotal(order.items, order.shippingCharge, order.coupon)}
          </p>
        </Col>
      </TransactionSection>
      <ContentSection>
        <h4>
          {order.status === "Delivered"
            ? `Delivered on ${new Date(order.deliveredAt).toLocaleString()}`
            : `Status: ${order.status}`}
        </h4>
        {order.items.map((item, inx) => (
          <div
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: ".2fr .6fr .2fr",
              justifyContent: "space-around",
            }}
            key={inx}
          >
            <Image
              src={item.image}
              alt={item.name}
              height="150px"
              width="200px"
              style={{
                backgroundColor: "var(--bs-blue)",
                objectFit: "cover",
                alignSelf: "center",
                justifySelf: "center",
              }}
            />
            <Col>
              <h4>Item: {item.name}</h4>
              <p>Size: {item.size}</p>
              <p>
                Price: {item.price} Quantity: {item.quantity}
              </p>
            </Col>
            <Button
              style={{
                alignSelf: "center",
                margin: "2rem",
                marginRight: "4rem",
                padding: "1rem",
              }}
              onClick={() => navigate(`/products/${item.productId}`)}
            >
              Buy it again
            </Button>
          </div>
        ))}
      </ContentSection>
    </Container>
  );
}
