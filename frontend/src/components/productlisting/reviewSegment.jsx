import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { ChatLeftTextFill, StarFill } from "react-bootstrap-icons";
import styled from "styled-components";

const NoReviewsWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin: 2rem;
  padding: 2rem;
`;

const ReviewWrapper = styled.div`
  display: grid;
  gap: 2rem;
  margin: 2rem;
  padding: 2rem;
`;

const Container = styled.section`
  display: grid;
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
  background-color: white;
  margin: 2rem 15rem;
`;

const getReviewBadgeColor = (rating) => {
  switch (rating) {
    case 1:
      return "danger";
    case 2:
      return "danger";
    case 3:
      return "warning";
    case 4:
      return "success";
    case 5:
      return "success";
    default:
      return "success";
  }
};
export default function ReviewSegment({ selectedFilter, reviews }) {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [loadReviews, setLoadReviews] = useState(5);

  useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredReviews(reviews);
      return;
    }

    setFilteredReviews(
      reviews.filter((review) =>
        review.rating === selectedFilter ? true : false
      )
    );
  }, [selectedFilter, reviews]);
  return (
    <Container>
      {filteredReviews.length ? null : (
        <NoReviewsWrapper>
          <ChatLeftTextFill
            size={"10rem"}
            color={"var(--bs-primary)"}
            style={{ justifySelf: "end" }}
          />
          <h3 style={{ justifySelf: "start" }}>No Reviews on this Product</h3>
        </NoReviewsWrapper>
      )}

      {filteredReviews.map((review, inx) => {
        return inx < loadReviews ? (
          <>
            <ReviewWrapper key={inx}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 9fr",
                  gap: "2rem",
                  alignItems: "center",
                }}
              >
                <Badge
                  bg={getReviewBadgeColor(review.rating)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.3rem",
                  }}
                >
                  <h3>{review.rating}</h3>
                  <StarFill size={"2.2rem"} />
                </Badge>
                <h3>{review.title}</h3>
              </div>
              <p>{review.message}</p>
              <h5
                style={{ display: "grid", justifyItems: "end" }}
              >{`~ By ${review.userName}`}</h5>
            </ReviewWrapper>
            {filteredReviews.length > 1 &&
            filteredReviews.length !== inx + 1 ? (
              <hr />
            ) : null}
          </>
        ) : null;
      })}

      {loadReviews < filteredReviews.length ? (
        <Button
          variant="outline-secondary"
          style={{
            justifySelf: "center",
            margin: "1rem",
            padding: "1rem 5rem",
          }}
          onClick={() => setLoadReviews(loadReviews + 5)}
        >
          Show More
        </Button>
      ) : null}
    </Container>
  );
}
