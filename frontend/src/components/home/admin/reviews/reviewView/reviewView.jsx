import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { ArrowLeft, Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteReviewPopUp from "../deleteReviewPopUp";
import { loadReviewDetails } from "./reviewViewHelper";

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

export default function ReviewView() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();
  const { selectedReview } = useParams();

  const [deletePopUp, setDeletePopUp] = useState(false);
  const [showDeletePopUp, hideDeletePopUp] = [
    () => setDeletePopUp(true),
    (item) => {
      setDeletePopUp(false);
      if (item.isDeleted) prevView();
    },
  ];
  const prevView = () => navigate(-1);

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
    <>
      <DeleteReviewPopUp
        selectedReview={selectedReview}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="" style={{ padding: "0" }} onClick={prevView}>
            <ArrowLeft size={"2rem"} />
          </Button>
          <h3>View Review</h3>
        </div>
        <Form style={{ display: "grid", gap: ".5rem" }}>
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <FormControl type="text" disabled value={title} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Message</FormLabel>
            <FormControl
              type="text"
              as="textarea"
              rows={5}
              disabled
              value={message}
              style={{ minHeight: "8.5rem" }}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Rating</FormLabel>
            <FormControl type="number" disabled value={rating} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl type="text" disabled value={userName} />
          </FormGroup>
          <FormGroup style={{ marginBottom: ".5rem" }}>
            <FormLabel>Product Id</FormLabel>
            <FormControl type="text" disabled value={productId} />
          </FormGroup>
          <ButtonGroup style={{ gap: "2rem" }}>
            <Button
              style={{ backgroundColor: "white" }}
              onClick={showDeletePopUp}
            >
              <Trash /> Delete
            </Button>
            <Button as={Link} to={`/admin/reviews/edit/${selectedReview}`}>
              <Pencil /> Edit
            </Button>
          </ButtonGroup>
        </Form>
      </BlockEnclosure>
    </>
  );
}
