// import reviews from "./data.json";
import { Quote } from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

async function getRecentReviews() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let reviews = [];
  try {
    const res = await axiosInstance.get(`/api/reviews/recent`);
    reviews = res.data.reviews;
  } catch (err) {
    console.log(err);
    return [];
  }
  return reviews;
  // return [];
}

const Container = styled.section`
  margin: 3rem;
  padding: 3rem;
`;

const CardWrapper = styled.div`
  .card {
    height: 300px;
    width: 500px;
    border: 1px black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: orange;
    :hover {
      transition: 0.5s;
      transform: scale(1.1);
    }
  }
  p {
    margin: 2rem;
  }
`;

const CarouselWrapper = styled.div`
  background-color: #ffd07a;
  .react-multi-carousel-list {
    padding-top: 40px;
    padding-bottom: 50px;
  }
  .react-multi-carousel-item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin: 2rem;
  color: orange;
  font-family: Pacifico;
  font-size: 5rem;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getRecentReviews()
      .then((reviewList) => setReviews(reviewList))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Title>Hear from our Customers!</Title>
      <CarouselWrapper>
        <Carousel responsive={responsive}>
          {reviews.map((review, index) => (
            <CardWrapper key={index}>
              <Card>
                <Quote
                  size={"50px"}
                  style={{
                    alignSelf: "flex-start",
                    margin: "20px 20px 20px 20px",
                  }}
                />
                <p>{review.message}</p>
                <h3>{review.userName}</h3>
                <Quote
                  size={"50px"}
                  style={{
                    alignSelf: "flex-end",
                    margin: "20px 20px 20px 20px",
                    transform: "rotateY(180deg) rotateX(180deg)",
                  }}
                />
              </Card>
            </CardWrapper>
          ))}
        </Carousel>
      </CarouselWrapper>
    </Container>
  );
};

export default CustomerReviews;
