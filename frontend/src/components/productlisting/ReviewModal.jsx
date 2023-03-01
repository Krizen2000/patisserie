import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { CacheContext } from "../../cacheProvider";
import { StarFill } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import axios from "axios";

async function sendRating(userName, productId, rating, title, message) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  let dataPacket = {
    userName,
    productId,
    rating,
  };
  if (title) {
    dataPacket["title"] = title;
    dataPacket["message"] = message;
  }
  try {
    const res = await axiosInstance.post(`/api/reviews`, dataPacket);
    console.log("Post Review: ", res.data);
  } catch (err) {
    console.log(err);
  }
}

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export default function ReviewModal({
  reviewModalShow,
  setReviewModalShow,
  productId,
}) {
  const cacheContext = useContext(CacheContext);
  const userName = cacheContext.cache["userName"];
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const postRating = async () => {
    await sendRating(userName, productId, rating, title, message);
    setReviewModalShow(false);
  };
  return (
    <Modal
      show={reviewModalShow}
      onHide={() => setReviewModalShow(false)}
      size="lg"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          color: "var(--bs-white)",
          backgroundColor: "var(--bs-primary)",
        }}
      >
        <Modal.Title>Make a Review or a Rating</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "grid", gap: "1rem" }}>
        <Row>
          <p>Ratings:</p>
          {[1, 2, 3, 4, 5].map((currRating) => (
            <Button variant="none" onClick={() => setRating(currRating)}>
              <StarFill
                size="2.5rem"
                color={
                  currRating <= rating
                    ? "var(--bs-primary)"
                    : "var(--bs-secondary)"
                }
              />
            </Button>
          ))}
        </Row>
        <div>
          <p>Comment (optional):</p>
          <FormGroup>
            <FormLabel>Title:</FormLabel>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ backgroundColor: "var(--bs-gray-100)" }}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Message:</FormLabel>
            <FormControl
              as="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ backgroundColor: "var(--bs-gray-100)" }}
            />
          </FormGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => setReviewModalShow(false)}
        >
          Close
        </Button>
        <Button variant="primary" onClick={postRating}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
