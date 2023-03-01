import React from "react";
import { Button, Dropdown, ProgressBar } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import styled from "styled-components";

const RatingsWrapper = styled.div`
  grid-column: span 2;
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin: 1rem;
  padding: 1rem;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background-color: white;
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
  margin: 2rem 15rem;
  padding: 3rem;
`;

const ratingBarColours = ["success", "success", "warning", "danger", "danger"];
const totalRatings = (reviews) =>
  reviews.filter((review) => (review.rating ? true : false)).length;
const overallRating = (reviews) =>
  reviews.reduce((prevRating, review) => prevRating + review.rating, 0) /
  totalRatings(reviews);
const filterReviewByRating = (reviews, rating) =>
  reviews.filter((review) => (review.rating === rating ? true : false)).length;
const percentageOfReviewByRating = (reviews, rating) =>
  (filterReviewByRating(reviews, rating) * 100) / reviews.length;

export default function RatingsAndReviews({
  setReviewModalShow,
  selectedFilter,
  setSelectedFilter,
  reviews,
}) {
  return (
    <Container>
      <h2>Ratings & Reviews</h2>
      <Button
        variant="outline-primary"
        onClick={() => setReviewModalShow(true)}
      >
        Rate Product
      </Button>
      <RatingsWrapper>
        <div
          style={{
            display: "grid",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h1>
            {`${overallRating(reviews).toPrecision(2)} `}
            <StarFill size={"4rem"} color="#f2f200" />
          </h1>
          <p style={{ gridColumn: "span 2" }}>{`${totalRatings(
            reviews
          )} Ratings & ${reviews.length} Reviews`}</p>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {ratingBarColours.map((barColour, inx) => (
            <div
              key={inx}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 7fr 1fr",
                gap: "1rem",
              }}
            >
              <p>
                {ratingBarColours.length - inx} <StarFill color={"#eeee00"} />
              </p>
              <ProgressBar
                variant={barColour}
                now={percentageOfReviewByRating(
                  reviews,
                  ratingBarColours.length - inx
                )}
                style={{ minWidth: "35rem" }}
              />
              <p>
                {filterReviewByRating(reviews, ratingBarColours.length - inx)}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <h4>Filter:</h4>
          <Dropdown>
            <DropdownToggle variant="success">{selectedFilter}</DropdownToggle>
            <DropdownMenu>
              {[5, 4, 3, 2, 1, "All"].map((item) => (
                <DropdownItem onClick={() => setSelectedFilter(item)}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </RatingsWrapper>
    </Container>
  );
}
