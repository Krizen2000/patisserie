import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Button, Toast, ToastBody, ToastHeader } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { CacheContext } from "../cacheProvider";

async function subscribeNewsLetter(name, email) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  const datapacket = { name, email };

  try {
    await axiosInstance.post("/api/newsLetter", datapacket);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 5rem 0.75rem;
  background-color: #a3bb98;

  form {
    background-color: white;
    border: 0.12rem solid black;
    padding: 5rem;
    margin: 0.5rem;
    box-shadow: -0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.6),
      0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.6);
  }
  .form-group {
    margin: 2rem;
  }
  .form-control {
    background-color: white;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f1f1f1;
  h1 {
    font-family: Pacifico;
    margin: 1rem 0rem;
  }
  p {
    margin: 1rem 0rem;
  }
`;

export default function SubcribeNewsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const cacheContext = useContext(CacheContext);
  // const [isSubscribed, setIsSubscribed] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(
    cacheContext.cache["subscribedNewsLetter"]
  );
  const [showToast, setShowToast] = useState(false);
  const clearForm = () => {
    setName("");
    setEmail("");
  };

  useEffect(() => {
    if (isSubscribed) {
      cacheContext.setCache({
        ...cacheContext.cache,
        subscribedNewsLetter: isSubscribed,
      });
    }
  }, [isSubscribed]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          minWidth: "100vw",
          display: "grid",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          autohide
          delay={3000}
          bg="success"
        >
          <ToastHeader
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <strong>Pâtisserie</strong>
          </ToastHeader>
          <ToastBody style={{ color: "var(--bs-white)" }}>
            Subscribed to NewsLetter successfully!
          </ToastBody>
        </Toast>
      </div>
      <Container>
        <TextWrapper>
          <h1>DAILY UPDATES</h1>
          <p>
            Subcribe to our newsletter to know more about our new addition to
            menu items and announcements
          </p>
        </TextWrapper>
        <Form>
          <h2>Newsletter</h2>

          {isSubscribed ? (
            <div style={{ marginTop: "2rem" }}>
              <strong>You have Subscribed!</strong>
            </div>
          ) : (
            <>
              {" "}
              <Form.Group className="form-group">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Button variant="secondary" type="reset" onClick={clearForm}>
                  Clear
                </Button>
                <Button
                  onClick={() => {
                    subscribeNewsLetter(name, email);
                    setShowToast(true);
                    setIsSubscribed(true);
                  }}
                >
                  Submit
                </Button>
              </Form.Group>
            </>
          )}
        </Form>
      </Container>
    </>
  );
}
