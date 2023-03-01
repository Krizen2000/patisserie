import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Toast, ToastBody, ToastHeader } from "react-bootstrap";
import { ArrowLeft, Cart2 } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../cacheProvider";
import AddressSelector from "../components/cart/addressSelector";
import BillSection from "../components/cart/billSection";
import EmptyCart from "../components/cart/emptyCart";
import ProductList from "../components/cart/productList";
import PromoSection from "../components/cart/promoSection";

async function getProductInfo(productId, size) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  let product = null;
  try {
    const res = await axiosInstance.get(`/api/products/find/${productId}`);
    console.log("Res: ", res.data);
    product = res.data;
  } catch (err) {
    console.log(err);
  }
  if (!product) return null;

  const price = product.price[product.size.indexOf(size)];
  return { ...product, price: price };
}

// ! Not Completed yet
async function initiateCheckout(
  userName,
  address,
  items,
  shippingCharge,
  coupon
) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  const dataPacket = {
    userName,
    address,
    items,
    shippingCharge,
    coupon,
    paymentMethod: "Cash on delivery",
  };
  try {
    const res = await axiosInstance.post(`/api/orders/`, dataPacket);
    console.log("Order Created:", res.data);
    return res.status === 201;
  } catch (err) {
    console.log(err);
    return false;
  }
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
  gap: 1rem;
  margin: 2rem 4rem;
  padding: 2rem 4rem;
`;

const orderPlacedToast = {
  variant: "success",
  title: "Order placed successfully!",
  message: "The Cart items are been processed to be delivered.",
};
const orderFailedToast = {
  variant: "danger",
  title: "Order coudn't be registered!",
  message:
    "There was an error while placing the order! Please try again later!",
};
export default function Cart() {
  const cacheContext = useContext(CacheContext);
  const userName = cacheContext.cache["userName"];
  const [items, setItems] = useState(cacheContext.cache["cart"]);
  const [promoCode, setPromoCode] = useState({ isValid: false });
  const [shippingAddress, setShippingAddress] = useState({});
  const shippingCharge = parseFloat(process.env.REACT_APP_SHIPPING_CHARGE);

  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({
    variant: "",
    title: "",
    message: "",
  });
  console.log("Cart: ", cacheContext.cache["cart"]);
  const navigate = useNavigate();

  const checkoutOperator = async () => {
    try {
      const modifiedItems = items.map((item) => ({
        ...item,
        productId: item.id,
      }));
      const success = await initiateCheckout(
        userName,
        shippingAddress,
        modifiedItems,
        shippingCharge,
        promoCode
      );
      if (!success) {
        setToastData(orderFailedToast);
        setShowToast(true);
        return;
      }
      cacheContext.setCache({ ...cacheContext.cache, cart: [] });
      setItems([]);
      setToastData(orderPlacedToast);
      setShowToast(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const dataLoader = async () => {
      let itemsWithMoreInfo = await Promise.all(
        items.map(async (item) => {
          const product = await getProductInfo(item.id, item.size);
          return { ...product, ...item }; // Replaces size and price values
        })
      );
      console.log("itemWithMoreInfo: ", itemsWithMoreInfo);
      setItems(itemsWithMoreInfo);
    };
    dataLoader();
    return () => {};
  }, []);

  // Refreshing Cache
  useEffect(() => {
    const newCache = { ...cacheContext.cache, cart: items };
    cacheContext.setCache(newCache);
  }, [items]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          minWidth: "100vw",
          display: "grid",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          autohide
          delay={3000}
          bg={toastData.variant}
        >
          <ToastHeader>{toastData.title}</ToastHeader>
          <ToastBody>{toastData.message}</ToastBody>
        </Toast>
      </div>
      <Row
        style={{
          gap: "1rem",
          margin: "2rem",
          padding: "2rem",
        }}
      >
        <Button variant="none" onClick={() => navigate(-1)}>
          <ArrowLeft size={"3rem"} />
        </Button>
        <h1 style={{ fontFamily: "Pacifico" }}>SHOPPING CART</h1>
        <Cart2 size={"3rem"} />
      </Row>
      <Container>
        {items.length ? (
          <div
            style={{
              display: "grid",
              alignItems: "start",
              gridTemplateColumns: "2fr 1fr",
            }}
          >
            <ProductList items={items} setItems={setItems} />
            <Col>
              <AddressSelector setShippingAddress={setShippingAddress} />
              <PromoSection
                setPromoCode={setPromoCode}
                setToastData={setToastData}
                setShowToast={setShowToast}
              />
              <BillSection items={items} promoCode={promoCode} />
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  margin: "0rem 0.5rem",
                  padding: "0rem 0.5rem",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <Button
                  variant="outline-secondary"
                  as={Link}
                  to="/menu"
                  style={{ padding: "2rem" }}
                >
                  Continue Shopping
                </Button>
                <Button style={{ padding: "2rem" }} onClick={checkoutOperator}>
                  Checkout
                </Button>
              </div>
            </Col>
          </div>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </>
  );
}
