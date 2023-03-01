import React, { useState } from "react";
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
import { useNavigate } from "react-router";
import styled from "styled-components";
import { sendUserDetails } from "./userCreateHelper";

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

export default function UserCreate() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const prevView = () => navigate(-1);
  const sendUser = async () => {
    await sendUserDetails(
      name,
      userName,
      password,
      isAdmin,
      phoneNumber,
      email
    );
    setTimeout(() => null, 500);
    prevView();
  };

  return (
    <BlockEnclosure>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button variant="" style={{ padding: "0" }} onClick={prevView}>
          <ArrowLeft size={"2rem"} />
        </Button>
        <h3>Create User</h3>
      </div>
      <Form style={{ display: "grid", gap: ".5rem" }}>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl type="text" onChange={(e) => setName(e.target.value)} />
          <FormText>Name must be unique</FormText>
        </FormGroup>
        <FormGroup>
          <FormLabel>Username</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Phone Number</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
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
          <Button onClick={sendUser}>Save</Button>
        </ButtonGroup>
      </Form>
    </BlockEnclosure>
  );
}
