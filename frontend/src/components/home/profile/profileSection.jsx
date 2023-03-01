import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import { Pencil, PersonCircle, Save } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { CacheContext } from "../../../cacheProvider";

async function getUserInfo(userName) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let userData = null;
  try {
    const res = await axiosInstance.get(`/api/users/find/${userName}`);
    userData = res.data;
    console.log("UserData: ", userData);
  } catch (err) {
    console.log(err);
  }
  return userData;
}

async function updateUserInfo(userData) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  try {
    const res = await axiosInstance.put(
      `/api/users/${userData.userName}`,
      userData
    );
    console.log("Updated User: ", res.data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteUserAccount(userName) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  try {
    const res = await axiosInstance.delete(`/api/users/${userName}`);
    console.log("res: ", res);
  } catch (err) {
    console.log(err);
  }
}

const Wrapper = styled.div`
  display: ${({ horizontal }) => (horizontal ? "flex" : "grid")};
  gap: 2rem;
  grid-template-columns: ${({ forForm }) => (forForm ? "1fr 8fr 1fr" : null)};
  justify-items: baseline;
  align-items: center;
  padding: 4rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const ProfileWrapper = styled.section`
  display: grid;
  align-content: flex-start;
  gap: 1rem;
  margin: 0rem 1rem;
  padding: 0rem 1rem;
`;

export default function ProfileSection({ promptData, setPromptData }) {
  const cacheContext = useContext(CacheContext);
  const userName = cacheContext.cache["userName"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [isDisabled, setIsDisabled] = useState({
    name: true,
    email: true,
    phoneNo: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const dataLoader = async () => {
      const userData = await getUserInfo(userName);
      setName(userData.name);
      setEmail(userData.email);
      setPhoneNo(userData.phoneNumber);
    };
    dataLoader();
    return () => {};
  }, []);

  useEffect(() => {
    const deleteAccount = async () => {
      await deleteUserAccount(userName);
      cacheContext.setCache({
        ...cacheContext.cache,
        userName: null,
        token: null,
        isAdmin: false,
      });
      setPromptData({ ...promptData, action: "", proceed: false });
      navigate("/");
    };
    const logOutAccount = () => {
      cacheContext.setCache({
        ...cacheContext.cache,
        userName: null,
        token: null,
        isAdmin: false,
      });
      setPromptData({ ...promptData, action: "", proceed: false });
      navigate("/");
    };

    if (!promptData.proceed) return;

    if (promptData.action === "delete") deleteAccount();
    if (promptData.action === "logout") logOutAccount();

    return () => {};
  }, [promptData.proceed]);

  return (
    <ProfileWrapper>
      <Wrapper horizontal>
        <PersonCircle size="4rem" color="var(--bs-primary)" />
        <h1>Profile Details</h1>
      </Wrapper>

      <Wrapper forForm>
        <FormLabel>Name: </FormLabel>
        <FormControl
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isDisabled.name}
        />
        <Button
          variant="outline-primary"
          onClick={async () => {
            setIsDisabled({ ...isDisabled, name: !isDisabled.name });
            if (!isDisabled.name) {
              await updateUserInfo({ userName, name });
            }
          }}
        >
          {isDisabled.name ? <Pencil /> : <Save />}
        </Button>
        <FormLabel>Email:</FormLabel>
        <FormControl
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isDisabled.email}
        />
        <Button
          variant="outline-primary"
          onClick={async () => {
            setIsDisabled({ ...isDisabled, email: !isDisabled.email });
            if (!isDisabled.email) {
              await updateUserInfo({ userName, email });
            }
          }}
        >
          {isDisabled.email ? <Pencil /> : <Save />}
        </Button>
        <FormLabel>PhoneNo:</FormLabel>
        <FormControl
          type="text"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          disabled={isDisabled.phoneNo}
        />
        <Button
          variant="outline-primary"
          onClick={async () => {
            setIsDisabled({ ...isDisabled, phoneNo: !isDisabled.phoneNo });
            if (!isDisabled.phoneNo) {
              await updateUserInfo({ userName, phoneNumber: phoneNo });
            }
          }}
        >
          {isDisabled.phoneNo ? <Pencil /> : <Save />}
        </Button>
      </Wrapper>
      <ButtonWrapper>
        <Button
          variant="outline-secondary"
          style={{ padding: "1.5rem 0rem" }}
          onClick={() => {
            const title = "Account Deletion";
            const message =
              "The User account will be deleted forever! Proceed?";
            setPromptData({
              ...promptData,
              title,
              message,
              action: "delete",
              visible: true,
            });
          }}
        >
          Delete
        </Button>
        <Button
          variant="primary"
          style={{ padding: "1.5rem 0rem" }}
          onClick={() => {
            const title = "Log Out";
            const message = "Are you sure you want to Log out?";
            setPromptData({
              ...promptData,
              title,
              message,
              action: "logout",
              visible: true,
            });
          }}
        >
          Sign out
        </Button>
      </ButtonWrapper>
    </ProfileWrapper>
  );
}
