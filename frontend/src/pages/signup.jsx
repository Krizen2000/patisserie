/**
 * ! STYLING OF THIS SITE NOT DONE
 */

import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Image,
  NavLink,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../cacheProvider";

async function requestUserSignUp(userCredentials) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let res;
  try {
    res = await axiosInstance.post("/api/register", userCredentials);
  } catch (err) {
    console.log(err);
    return;
  }
  console.log("Session Token: ", res.data.token);

  return res.status === 201
    ? [res.data.token, res.data.isAdmin]
    : [null, false];
}

const BlockEnclosure = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 2.5rem;
  gap: 3rem;
`;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  margin: 2rem;
  padding: 2rem;
  flex-basis: 40rem;
  border: 0.125rem solid black;
  a,
  h1 {
    display: grid;
    justify-content: center;
  }
  a:hover {
    color: var(--bs-blue);
  }
`;

const ColWrapper = styled.div`
  display: grid;
  gap: 0.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 0.5rem;
  gap: 1rem;
  & > * {
    flex-grow: 1;
  }
`;

export default function SignUp() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const cacheContext = useContext(CacheContext);
  const saveSignUpCredentials = (token, userName, isAdmin) =>
    cacheContext.setCache({ ...cacheContext.cache, userName, isAdmin, token });

  const sendSignUpCredentials = async () => {
    const userCredentials = {
      name,
      userName,
      phoneNumber,
      email,
      password,
    };

    let token = null;
    let isAdmin = false;
    try {
      [token, isAdmin] = await requestUserSignUp(userCredentials);
    } catch (err) {
      console.error(err);
      return;
    }

    saveSignUpCredentials(token, userName, isAdmin);
    navigate("/");
  };

  return (
    <BlockEnclosure>
      <Image src={"https://source.unsplash.com/random/640x640/?restaurants"} />
      <Container>
        <h1>Sign Up</h1>
        <Form as={ColWrapper}>
          <FormGroup>
            <FormLabel>Name:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Username:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter username here"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>PhoneNo:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter phone no here"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email:</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password:</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Confirm Password:</FormLabel>
            <FormControl
              type="password"
              placeholder="Rewrite password here"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            {password !== confPassword ? (
              <FormText>Please enter matching passwords</FormText>
            ) : null}
          </FormGroup>
          <ButtonWrapper>
            <Button
              type="reset"
              variant="light"
              style={{ border: ".0625rem solid var(--bs-primary)" }}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={sendSignUpCredentials}
            >
              Submit
            </Button>
          </ButtonWrapper>
          <NavLink active as={Link} to="/login">
            Already have an account? LogIn
          </NavLink>
        </Form>
      </Container>
    </BlockEnclosure>
  );
}
