import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { CacheContext } from "../../../cacheProvider";

async function getUserOrders(userName) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let orders = [];
  try {
    const res = await axiosInstance.get(`/api/orders/recent/${userName}`);
    orders = res.data.orders;
    console.log("Order List", res.data);
  } catch (err) {
    console.log(err);
    return [];
  }
  return orders;
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

const Container = styled.section`
  display: grid;
  gap: 1rem;
  margin: 0rem 1rem;
  padding: 0rem 1rem;
`;

const Title = styled.h3`
  display: grid;
  padding: 2rem 4rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

const OrderWrapper = styled.div`
  display: grid;
  gap: 0.75rem;
  align-items: center;
  padding: 2rem 4rem;
  margin: 0rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

export function OrderSection() {
  const cacheContext = useContext(CacheContext);
  const userName = cacheContext.cache["userName"];
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const dataLoader = async () => {
      const orders = await getUserOrders(userName);
      const modifiedOrders = await Promise.all(
        orders.map(async (order) => {
          const modifiedItems = await Promise.all(
            order.items.map(async (item) => {
              console.log("Product Id in item: ", item.productId);
              const itemData = await getProductData(item.productId);
              const { image, name } = itemData;
              return { ...item, image, name };
            })
          );
          return { ...order, items: modifiedItems };
        })
      );
      setOrderList(modifiedOrders);
    };
    dataLoader();
    return () => {};
  }, [userName]);

  return (
    <Container>
      <Title>Recent Orders</Title>

      {orderList.map((order, inx) => (
        <OrderWrapper key={inx}>
          <h5>
            {order.status === "Delivered"
              ? `Delivered on ${new Date(order.deliveredAt).toLocaleString()}`
              : `Status: ${order.status}`}
          </h5>
          {order.items.map((item, index) => (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "3fr 7fr",
                  gap: "2rem",
                  justifyItems: "center",
                }}
                key={index}
              >
                <Image
                  src={item.image}
                  alt="image"
                  style={{
                    backgroundColor: "var(--bs-blue)",
                    height: "12rem",
                    aspectRatio: "1.25 / 1",
                  }}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,1fr)",
                    alignContent: "center",
                  }}
                >
                  <p>Name: </p>
                  <p>{item.name}</p>
                  <p>Size:</p>
                  <p>{item.size}</p>
                  <div
                    style={{
                      gridColumn: "span 2",
                      display: "grid",
                      gridTemplateColumns: "repeat(4,1fr)",
                      gap: ".5rem",
                    }}
                  >
                    <p>Price:</p> <p>{item.price}</p> <p>Quantity:</p>
                    <p>{item.quantity}</p>
                  </div>
                </div>
              </div>
              {(order.items.length >= 1) & (index < order.items.length - 1) ? (
                <hr />
              ) : null}
            </>
          ))}
        </OrderWrapper>
      ))}
    </Container>
  );
}
