import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormSelect,
  Image,
  ToggleButton,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CacheContext } from "../../cacheProvider";

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

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
  margin: 0rem 3rem;
  padding: 4rem 8rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

const OrderWrapper = styled(Wrapper)`
  :hover {
    transition: 500ms ease;
    box-shadow: 0rem 0rem 0.5rem var(--bs-primary);
    border: 0.0625rem solid var(--bs-primary);
  }
`;

export default function OrderListing() {
  const cacheContext = useContext(CacheContext);
  const userName = cacheContext.cache["userName"];
  const [selectedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();
  // const [orders, setOrders] = useState(loadData());
  const [orders, setOrders] = useState([]);

  const calculateTotal = (items, shippingCharge) =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    shippingCharge;

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
      setOrders(modifiedOrders);
    };
    dataLoader();
    return () => {};
  }, [userName]);

  return (
    <Container>
      <Button
        variant="none"
        onClick={() => navigate(-1)}
        style={{ justifySelf: "left" }}
      >
        <ArrowLeft size="3rem" />
      </Button>

      <Wrapper>
        <h1>Your Orders</h1>
        <Row>
          <FormControl
            type="text"
            style={{ width: "50%" }}
            placeholder="Search all orders"
          />
          <FormSelect
            variant="secondary"
            value={selectedFilter}
            onChange={(evt) => setSelectedFilter(evt.target.value)}
            style={{ maxWidth: "10rem" }}
          >
            <option value="All">All</option>
            <option value="Delivered">Delivered</option>
            <option value="Preparing">Preparing</option>
            <option value="On the way">On the way</option>
          </FormSelect>
        </Row>
        <Row>
          {["All", "Delivered", "Preparing", "On the way"].map((item, inx) => (
            <ToggleButton
              key={inx}
              type="radio"
              variant="outline-primary"
              value={item}
              checked={item === selectedFilter}
              onClick={() => setSelectedFilter(item)}
            >
              {item}
            </ToggleButton>
          ))}
        </Row>
      </Wrapper>

      {orders
        .filter((order) => {
          if (selectedFilter === "All") return true;
          return order.status === selectedFilter;
        })
        .map((order, inx) => (
          <OrderWrapper key={inx}>
            <Row style={{ justifyContent: "space-between" }}>
              <Row style={{ gap: "3rem", magin: 0, padding: 0 }}>
                <Col style={{ gap: 0, padding: 0 }}>
                  <p>ORDER PLACED</p>
                  {/* ! Use this instead of the new one for production  */}
                  {/* <time>{order.createdAt.toDateString()}</time> */}
                  <time dateTime={new Date(order.createdAt).toISOString()}>
                    {new Date(order.createdAt).toDateString()}
                  </time>
                </Col>
                <Col style={{ gap: 0, padding: 0 }}>
                  <p>TOTAL</p>
                  <p>{`₹ ${calculateTotal(
                    order.items,
                    order.shippingCharge
                  )}`}</p>
                </Col>
              </Row>
              <Col style={{ gap: 0, padding: 0 }}>
                <p>ORDER #{order._id}</p>
                <Link to={`/orders/${order._id}`}>View order details</Link>
              </Col>
            </Row>
            <hr />
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
                    margin: "1rem",
                    marginRight: "4rem",
                    padding: "1rem",
                  }}
                  onClick={() => navigate(`/products/${item.productId}`)}
                >
                  Buy it again
                </Button>
              </div>
            ))}
          </OrderWrapper>
        ))}
    </Container>
  );
}

// ? CAN ADD PAGINATION TO MAKE IT MORE MANAGABLE
