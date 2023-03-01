import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProductDetails from "../components/productlisting/productDetails";
import RatingsAndReviews from "../components/productlisting/ratingsAndReviews";
import ReviewModal from "../components/productlisting/ReviewModal";
import ReviewSegment from "../components/productlisting/reviewSegment";

async function getProductInfo(productId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  let product = {};
  try {
    const res = await axiosInstance.get(`/api/products/find/${productId}`);
    console.log("Product Info: ", res);
    product = res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
  return product;
}

const initialProduct = { reviews: [], size: [], price: [] };
export default function ProductListing() {
  const [product, setProduct] = useState(initialProduct);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const { productId } = useParams();

  const [reviewModalShow, setReviewModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);

  useEffect(() => {
    getProductInfo(productId)
      .then((productData) =>
        setProduct(productData ? productData : initialProduct)
      )
      .catch((err) => console.log(err));
  }, [productId, reviewModalShow]);

  return (
    <>
      <Modal
        show={errorModalShow}
        onHide={() => setErrorModalShow(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Oops...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            It seems you have not logged into your account. You can do it by
            clicking on the button below
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setErrorModalShow(false)}
          >
            Close
          </Button>
          <Button variant="primary" as={Link} to="/login">
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
      <ReviewModal
        reviewModalShow={reviewModalShow}
        setReviewModalShow={setReviewModalShow}
        productId={product.id}
      />
      <ProductDetails
        product={product}
        unhideModal={() => setErrorModalShow(true)}
      />
      <RatingsAndReviews
        setReviewModalShow={setReviewModalShow}
        reviews={product.reviews}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <ReviewSegment
        reviews={product.reviews}
        selectedFilter={selectedFilter}
      />
    </>
  );
}
