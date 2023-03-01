import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteUserPopUp from "../deleteUserPopUp";
import { loadAllUsersDetails } from "./userListHelper";

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

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);

  const [showDeletePopUp, hideDeletePopUp] = [
    (item) => {
      setDeletePopUp(true);
      setSelectedUser(item.userName);
    },
    () => {
      setSelectedUser("");
      setDeletePopUp(false);
    },
  ];

  useEffect(() => {
    loadAllUsersDetails()
      .then((retrievedUsers) => setUsers(retrievedUsers))
      .catch((err) => console.log(err));
  }, [deletePopUp]);

  return (
    <>
      <DeleteUserPopUp
        selectedUser={selectedUser}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <h3>Users</h3>
        <Table striped style={{ border: "0.0625rem solid #c0c0c0" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td style={{ display: "flex", gap: "0.25rem" }}>
                  <Button
                    className="view-btn"
                    as={Link}
                    to={`/admin/users/view/${user.userName}`}
                  >
                    <Eye />
                  </Button>
                  <Button
                    className="edit-btn"
                    as={Link}
                    to={`/admin/users/edit/${user.userName}`}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="delete-btn"
                    onClick={() => showDeletePopUp(user)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" as={Link} to={`/admin/users/create`}>
          Create User
        </Button>
      </BlockEnclosure>
    </>
  );
}
