import React from "react";
import { Button } from "react-bootstrap";
import { CartX } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
`;

export default function EmptyCart() {
  return (
    <Container>
      <CartX size="10rem" />
      <h1>Your Cart is Empty</h1>
      <h4>Looks like you haven't make your choice</h4>
      <p>Try out products today!</p>
      <Button as={Link} to="/menu">
        Go to Menu
      </Button>
    </Container>
  );
}
