import styled from "styled-components";
import Announcement from "../components/home/announcement";
import CustomerReviews from "../components/home/customerReviews";
import SpecialProducts from "../components/home/specialProducts";
import SubcribeNewsletter from "../components/subscribeNewsLetter";
import React from "react";

export default function Home() {
  return (
    <>
      <Announcement />
      <SpecialProducts />
      <CustomerReviews />
      <SubcribeNewsletter />
    </>
  );
}
