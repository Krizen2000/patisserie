import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AddressSection } from "../components/home/profile/addressSection";
import { OrderSection } from "../components/home/profile/orderSection";
import ProfileSection from "../components/home/profile/profileSection";
import PromptPopUp from "../components/home/profile/promptPopUp";

const Col = styled.div`
  display: grid;
  align-content: flex-start;
  gap: 5rem;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 2rem;
  padding: 2rem;
`;

export default function Profile() {
  const [promptData, setPromptData] = useState({
    title: "",
    message: "",
    action: "",
    visible: false,
    proceed: false,
  });
  return (
    <>
      <PromptPopUp promptData={promptData} setPromptData={setPromptData} />
      <Container>
        <Button
          variant="none"
          style={{
            gridColumn: "span 2",
            justifySelf: "baseline",
          }}
        >
          <ArrowLeft size="3rem" />
        </Button>
        <Col>
          <ProfileSection
            promptData={promptData}
            setPromptData={setPromptData}
          />
          <AddressSection />
        </Col>
        <Col>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "2rem",
            }}
          >
            <Button
              variant="outline-primary"
              as={Link}
              to="/orders"
              style={{ padding: "2rem 0rem" }}
            >
              Your Orders
            </Button>
            <Button
              variant="primary"
              as={Link}
              to="/cart"
              style={{ padding: "2rem 0rem" }}
            >
              Your Cart
            </Button>
          </div>
          <OrderSection />
        </Col>
      </Container>
    </>
  );
}
