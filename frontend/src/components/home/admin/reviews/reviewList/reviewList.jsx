import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteReviewPopUp from "../deleteReviewPopUp";
import { loadAllReviewsDetails } from "./reviewListHelper";

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

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState({});
  const [deletePopUp, setDeletePopUp] = useState(false);

  const [showDeletePopUp, hideDeletePopUp] = [
    (item) => {
      setDeletePopUp(true);
      setSelectedReview(item._id);
    },
    () => {
      setSelectedReview("");
      setDeletePopUp(false);
    },
  ];

  useEffect(() => {
    loadAllReviewsDetails()
      .then((retrievedReviews) => setReviews(retrievedReviews))
      .catch((err) => console.log(err));
  }, [deletePopUp]);

  return (
    <>
      <DeleteReviewPopUp
        selectedReview={selectedReview}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <h3>Reviews</h3>
        <Table striped style={{ border: "0.0625rem solid #c0c0c0" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Username</th>
              <th>ProductId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{review.title}</td>
                <td>{review.rating}</td>
                <td>{review.userName}</td>
                <td>{review.productId}</td>
                <td style={{ display: "flex", gap: "0.25rem" }}>
                  <Button
                    className="view-btn"
                    as={Link}
                    to={`/admin/reviews/view/${review._id}`}
                  >
                    <Eye />
                  </Button>
                  <Button
                    className="edit-btn"
                    as={Link}
                    to={`/admin/reviews/edit/${review._id}`}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="delete-btn"
                    onClick={() => showDeletePopUp(review)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button as={Link} to={`/admin/reviews/create`}>
          Create Review
        </Button>
      </BlockEnclosure>
    </>
  );
}
