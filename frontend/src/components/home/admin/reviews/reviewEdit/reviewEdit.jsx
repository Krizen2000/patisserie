import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { loadReviewDetails, updateReviewDetails } from "./reviewEditHelper";

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

export default function ReviewEdit() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();
  const { selectedReview } = useParams();

  const prevView = () => navigate(-1);

  const updateReview = async () => {
    await updateReviewDetails(
      selectedReview,
      title,
      message,
      rating,
      userName,
      productId
    );
    setTimeout(() => null, 500);
    prevView();
  };

  useEffect(() => {
    loadReviewDetails(selectedReview)
      .then((retrievedReview) => {
        setTitle(retrievedReview.title);
        setMessage(retrievedReview.message);
        setRating(retrievedReview.rating);
        setUserName(retrievedReview.userName);
        setProductId(retrievedReview.productId);
      })
      .catch((err) => console.log(err));
  }, [selectedReview]);

  return (
    <BlockEnclosure>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="" style={{ padding: "0" }} onClick={prevView}>
          <ArrowLeft size={"2rem"} />
        </Button>
        <h3>Edit Review</h3>
      </div>
      <Form style={{ display: "grid", gap: ".5rem" }}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Message</FormLabel>
          <FormControl
            type="text"
            as="textarea"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ minHeight: "8.5rem" }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Rating</FormLabel>
          <FormControl
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: ".5rem" }}>
          <FormLabel>Product Id</FormLabel>
          <FormControl
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </FormGroup>
        <ButtonGroup style={{ gap: "2rem" }}>
          <Button type="reset" style={{ backgroundColor: "white" }}>
            Clear
          </Button>
          <Button onClick={updateReview}>Save</Button>
        </ButtonGroup>
      </Form>
    </BlockEnclosure>
  );
}
