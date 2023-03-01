import React from "react";
import { Button, FormControl, Image } from "react-bootstrap";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem;
  padding: 6rem 8rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

const ProductInfoLayout = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  justify-content: baseline;
  margin: 1rem;
  padding: 1rem;
  .product-name {
    grid-column: span 3;
  }
  .del-btn {
    grid-column: span 2;
  }
`;

export default function ProductList({ items, setItems }) {
  const onDelete = (givenItem) => {
    let currItems = items.filter((item) => item !== givenItem);
    setItems(currItems);
  };
  return (
    <Container>
      {items.map((item, inx) => (
        <>
          <div
            key={inx}
            style={{ display: "grid", gridTemplateColumns: "3fr 7fr" }}
          >
            <Image
              src={item.image}
              alt="Image"
              style={{
                height: "15rem",
                aspectRatio: 1.25 / 1,
                objectFit: "cover",
                backgroundColor: "var(--bs-blue)",
              }}
            />
            <ProductInfoLayout>
              <h3>Name: </h3>
              <h3 className="product-name">{`${item.name} (${item.size})`}</h3>
              <p>Each:</p>
              <p>₹{item.price}</p>
              <p>Total:</p>
              <p>₹{item.price * item.quantity}</p>
              <p>Quantity:</p>
              <FormControl
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNaN(value) || value < 1) return;

                  let cloneItems = [...items];
                  cloneItems[inx].quantity = e.target.value;
                  setItems(cloneItems);
                }}
              />
              <Button className="del-btn" onClick={() => onDelete(item)}>
                Delete
              </Button>
            </ProductInfoLayout>
          </div>
          {items.length > 1 && inx + 1 < items.length ? <hr /> : null}
        </>
      ))}
    </Container>
  );
}
