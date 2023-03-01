import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { sendReviewDetails } from "./reviewCreateHelper";

const BlockEnclosure = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 0.0625rem solid #c0c0c0;
  padding: 1.5rem;
  margin: 1.25rem;
  min-width: 80rem;
  background-color: var(--bs-white);
`;

export default function ReviewCreate() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();

  const prevView = () => navigate(-1);
  const sendReview = async () => {
    await sendReviewDetails(title, message, rating, userName, productId);
    setTimeout(() => null, 500);
    prevView();
  };

  return (
    <BlockEnclosure>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="" style={{ padding: "0" }} onClick={prevView}>
          <ArrowLeft size={"2rem"} />
        </Button>
        <h3>Create Review</h3>
      </div>
      <Form style={{ display: "grid", gap: ".5rem" }}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormControl type="text" onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Message</FormLabel>
          <FormControl
            type="text"
            as="textarea"
            rows={5}
            style={{ minHeight: "8.5rem" }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Rating</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setRating(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: ".5rem" }}>
          <FormLabel>Product Id</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setProductId(e.target.value)}
          />
        </FormGroup>
        <ButtonGroup style={{ gap: "2rem" }}>
          <Button type="reset" style={{ backgroundColor: "white" }}>
            Clear
          </Button>
          <Button onClick={sendReview}>Save</Button>
        </ButtonGroup>
      </Form>
    </BlockEnclosure>
  );
}
