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
import { ArrowLeft, Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteUserPopUp from "../deleteUserPopUp";
import { loadUserDetails } from "./userViewHelper";

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

export default function UserView() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const { selectedUser } = useParams();

  const [deletePopUp, setDeletePopUp] = useState(false);
  const [showDeletePopUp, hideDeletePopUp] = [
    () => setDeletePopUp(true),
    (item) => {
      setDeletePopUp(false);
      if (item.isDeleted) prevView();
    },
  ];

  useEffect(() => {
    loadUserDetails(selectedUser)
      .then((retrievedUser) => {
        setName(retrievedUser.name);
        setUserName(retrievedUser.userName);
        setPassword(retrievedUser.password);
        setPhoneNumber(retrievedUser.phoneNumber);
        setEmail(retrievedUser.email);
        setIsAdmin(retrievedUser.isAdmin);
      })
      .catch((err) => console.log(err));
  }, [selectedUser]);

  const prevView = () => navigate(-1);
  return (
    <>
      <DeleteUserPopUp
        selectedUser={selectedUser}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="" style={{ padding: "0" }} onClick={prevView}>
            <ArrowLeft size={"2rem"} />
          </Button>
          <h3>View User ({"Username"})</h3>
        </div>
        <Form style={{ display: "grid", gap: ".5rem" }}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl type="text" disabled value={name} />
            <FormText>Name must be unique</FormText>
          </FormGroup>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl type="text" disabled value={userName} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl type="password" disabled value={password} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Phone Number</FormLabel>
            <FormControl type="text" disabled value={phoneNumber} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl type="email" disabled value={email} />
          </FormGroup>
          <FormGroup style={{ marginBottom: ".5rem" }}>
            <FormLabel>IsAdmin</FormLabel>
            <FormSelect
              disabled
              value={isAdmin}
              onChange={(evt) => setIsAdmin(evt.target.value)}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </FormSelect>
          </FormGroup>
          <ButtonGroup style={{ gap: "2rem" }}>
            <Button
              style={{ backgroundColor: "white" }}
              onClick={showDeletePopUp}
            >
              <Trash /> Delete
            </Button>
            <Button as={Link} to={`/admin/users/edit/${userName}`}>
              <Pencil /> Edit
            </Button>
          </ButtonGroup>
        </Form>
      </BlockEnclosure>
    </>
  );
}
