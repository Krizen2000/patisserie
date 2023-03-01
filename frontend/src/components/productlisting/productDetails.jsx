import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import {
  Button,
  FormControl,
  Image,
  ToastContainer,
  ToggleButton,
} from "react-bootstrap";
import styled from "styled-components";
import { CacheContext } from "../../cacheProvider";

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1rem;
  padding: 5rem;
  background-color: white;
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 3fr 7fr;
  align-items: center;
  gap: 2rem;
  margin: 3rem;
  padding: 3rem;
`;

export default function ProductDetails({ product, unhideModal }) {
  const discountedPrice = (price, discount) =>
    discount ? parseFloat(price - (price * discount) / 100).toFixed(2) : price;
  console.log("Product Details: ", product);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  console.log("SelectedSize: ", selectedSize);

  const [showToast, setShowToast] = useState(false);

  const cacheContext = useContext(CacheContext);
  const checkLogin = () => (cacheContext.cache["userName"] ? true : false);
  const addToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      size: selectedSize,
      quantity: quantity,
    };

    let newCart = cacheContext.cache.cart;
    console.log("Old Cart:", newCart);
    // Check if item with exact info matches
    let itemListing = newCart.find(
      (currItem) => currItem.name === item.name && currItem.size === item.size
    );

    if (itemListing) {
      itemListing.quantity = itemListing.quantity + item.quantity;
      newCart = Object.keys(newCart).map((currItemId) =>
        newCart[currItemId].name === item.name &&
        newCart[currItemId].size === item.size
          ? itemListing
          : newCart[currItemId]
      );
    } else {
      newCart.push(item);
    }
    console.log("Final NewCart", newCart);
    cacheContext.setCache({ ...cacheContext.cache, cart: newCart });
  };

  useEffect(() => {
    setSelectedSize(product.size.at(0));
  }, [product]);

  return (
    <>
      <ToastContainer position="middle-center">
        <Toast
          show={showToast}
          autohide
          delay="2000"
          onClose={() => setShowToast(false)}
          bg="success"
        >
          <Toast.Header closeButton>Cart</Toast.Header>
          <Toast.Body>
            <p
              style={{ color: "var(--bs-white)" }}
            >{`${quantity} items added to Cart`}</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Container>
        <Image
          rounded
          src={product.image}
          style={{
            objectFit: "cover",
            width: "40rem",
            height: "30rem",
            border: "0.125rem solid var(--bs-gray-500)",
          }}
        />
        <InfoWrapper>
          <h2>Name:</h2>
          <h2 style={{ gridColumn: "span 3" }}>{product.name}</h2>
          <p>Description:</p>
          <p style={{ gridColumn: "span 3" }}>{product.description}</p>
          <h4>Price:</h4>
          <h4>{`₹ ${discountedPrice(
            product.price[product.size.indexOf(selectedSize)],
            product.discount
          )}`}</h4>

          <strike>
            {product.discount
              ? `₹${product.price[product.size.indexOf(selectedSize)]}`
              : null}
          </strike>
          <h4>{product.discount ? `${product.discount}% off` : null}</h4>

          <p>Size:</p>
          <ol
            style={{
              gridColumn: "span 3",
              listStyleType: "none",
              display: "flex",
              gap: "1rem",
              gridTemplateColumns: "repeat(3,1fr)",
            }}
          >
            {product.size.map((size) => (
              <li key={size}>
                <ToggleButton
                  type="radio"
                  variant="outline-primary"
                  value={size}
                  checked={size === selectedSize}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </ToggleButton>
              </li>
            ))}
          </ol>
          <></>
          <p>Quantity:</p>
          <FormControl
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (isNaN(value) || value < 1) return;
              setQuantity(parseInt(e.target.value));
            }}
          />
          <Button
            onClick={() => {
              if (!checkLogin()) {
                unhideModal();
                return;
              }
              addToCart();
              setShowToast(true);
            }}
          >{`Add to Cart`}</Button>
        </InfoWrapper>
      </Container>
    </>
  );
}
