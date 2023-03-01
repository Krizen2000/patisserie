/**
 * ! STYLING OF THIS SITE NOT DONE
 */

import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  NavLink,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../cacheProvider";

async function requestUserLogIn(userCredentials) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let res;
  try {
    res = await axiosInstance.post("/api/login", userCredentials);
  } catch (err) {
    console.log(err);
    return;
  }
  console.log("Session Token:", res.data.token);

  return res.status === 200 ? res.data : null;
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
  margin: 1rem;
  gap: 1rem;
  & > * {
    flex-grow: 1;
  }
`;

export default function Login() {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValidPhoneNumber = /^[0-9]|[\+]/g;
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const cacheContext = useContext(CacheContext);
  const saveLogInCredentials = (token, userName, isAdmin) =>
    cacheContext.setCache({ ...cacheContext.cache, userName, isAdmin, token });

  const sendLoginCredentials = async () => {
    let IdTag = loginId.match(isValidEmail)
      ? "email"
      : loginId.match(isValidPhoneNumber)
      ? "phoneNumber"
      : "userName";

    let userCredentials = { password };
    userCredentials[IdTag] = loginId;

    console.log("UserCredentials: ", userCredentials);
    let userData = null;
    try {
      userData = await requestUserLogIn(userCredentials);
    } catch (err) {
      console.error(err);
      return;
    }
    console.log("UserData: ", userData);

    const { token, userName, isAdmin } = userData;
    saveLogInCredentials(token, userName, isAdmin);
    navigate(-1);
  };

  return (
    <BlockEnclosure>
      <Image src={"https://source.unsplash.com/random/640x640/?restaurants"} />
      <Container>
        <h1>Login</h1>
        <Form as={ColWrapper}>
          <FormGroup>
            <FormLabel>Username / Email / Phone No:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter email here"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
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
              onClick={sendLoginCredentials}
            >
              Submit
            </Button>
          </ButtonWrapper>
          <NavLink active as={Link} to="/signup">
            Don't have an account? SignUp
          </NavLink>
        </Form>
      </Container>
    </BlockEnclosure>
  );
}
