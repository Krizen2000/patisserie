import Carousel from "react-multi-carousel";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

async function getAllProducts() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let products = null;
  try {
    const res = await axiosInstance.get("/api/products/all");
    console.log("Gotten Products:", res.data);
    products = res.data.products || null;
  } catch (err) {
    console.log(err);
  }
  return products;
}

const CardWrapper = styled.div`
  .card {
    height: 28rem;
    width: 23rem;
    display: flex;
    border: 0.0625rem solid var(--bs-gray-500);

    align-items: center;
    :hover {
      transition: 0.5s;
      transform: scale(1.1);
    }
    img {
      object-fit: cover;
      height: 75%;
    }
    .btn {
      background-color: orange;
      border-color: orange;
      min-width: 60%;
      margin: 1rem 0rem;
    }
  }
  .card-title {
    margin-top: 5px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  h1 {
    color: var(--bs-secondary);
  }
  h3 {
    color: white;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem;
  background-color: #ffd07a;
  border-radius: 0.5rem;
  border: 0.0125rem solid var(--bs-gray-500);
  .react-multi-carousel-list {
    padding: 3rem 0rem;
  }
  .react-multi-carousel-item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
};
const MenuSwipper = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((productList) => setProducts(productList));
  }, []);

  return (
    <>
      {[
        {
          category: "Bread",
          title: "Breads",
          desc: "Our breads are freshly baked and are ready to serve you!",
        },
        {
          category: "Cake",
          title: "Cakes",
          desc: "This type of treat can be used for celebrations!",
        },
        {
          category: "Pastry",
          title: "Pastries",
          desc: "Some delightful sweets can make your day! Try Now!",
        },
      ].map((item) => (
        <React.Fragment key={item.category}>
          <CarouselWrapper>
            <TitleWrapper>
              <h1>{item.title}</h1>
              <h3>{item.desc}</h3>
            </TitleWrapper>
            <Carousel responsive={responsive}>
              {products
                .filter((product) => product.category === item.category)
                .map((product) => (
                  <CardWrapper key={product.id}>
                    <Card>
                      <Card.Img src={product.image} variant="top" />
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Starting Price: ₹{product.price[0]}</Card.Text>
                      <Button as="a" href={`/products/${product.id}`}>
                        View
                      </Button>
                    </Card>
                  </CardWrapper>
                ))}
            </Carousel>
          </CarouselWrapper>
        </React.Fragment>
      ))}
    </>
  );
};

export default MenuSwipper;
