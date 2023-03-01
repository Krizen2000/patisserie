import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { loadUserDetails, modifyUserDetails } from "./userEditHelper";

const BlockEnclosure = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 0.0625rem solid #c0c0c0;
  padding: 1.5rem;
  margin: 1.25rem;
  min-width: 80rem;
  background-color: var(--bs-white);
`;

export default function UserEdit() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const { selectedUser } = useParams();

  const prevView = () => navigate(-1);
  const modifyUser = async () => {
    await modifyUserDetails(
      selectedUser,
      name,
      userName,
      password,
      prevPassword,
      isAdmin,
      phoneNumber,
      email
    );
    setTimeout(() => null, 500);
    prevView();
  };

  useEffect(() => {
    loadUserDetails(selectedUser)
      .then((retrievedUser) => {
        setName(retrievedUser.name);
        setUserName(retrievedUser.userName);
        setPassword(retrievedUser.password);
        setPrevPassword(retrievedUser.password);
        setPhoneNumber(retrievedUser.phoneNumber);
        setEmail(retrievedUser.email);
        setIsAdmin(retrievedUser.isAdmin);
      })
      .catch((err) => console.log(err));
  }, [selectedUser]);

  return (
    <BlockEnclosure>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="" style={{ padding: "0" }} onClick={prevView}>
          <ArrowLeft size={"2rem"} />
        </Button>
        <h3>Edit User</h3>
      </div>
      <Form style={{ display: "grid", gap: ".5rem" }}>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormText>Name must be unique</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormText>
            Password can only be overwritten as they are hashed
          </FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Phone Number</FormLabel>
          <FormControl
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: ".5rem" }}>
          <FormLabel>IsAdmin</FormLabel>
          <FormSelect
            value={isAdmin}
            onChange={(evt) => setIsAdmin(evt.target.value)}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </FormSelect>
        </FormGroup>
        <ButtonGroup style={{ gap: "2rem" }}>
          <Button type="reset" style={{ backgroundColor: "white" }}>
            Clear
          </Button>
          <Button onClick={modifyUser}>Save</Button>
        </ButtonGroup>
      </Form>
    </BlockEnclosure>
  );
}
