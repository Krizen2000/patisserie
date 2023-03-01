import React from "react";
import { useContext } from "react";
import { Container, Nav, NavLink } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Cart, Gear, PersonCircle, PersonDown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CacheContext } from "../cacheProvider";

const NavWrapper = styled.div`
  .navbar-nav {
    align-self: flex-end;
    align-items: center;
  }
  svg {
    height: 2rem;
    width: 2rem;
    margin-right: 0.5rem;
  }
`;

const LogoImage = styled.img`
  height: 5rem;
  width: 5rem;
  margin: 0.25rem 0.75rem;
`;

export default function NavigationBar() {
  const cache = useContext(CacheContext).cache;
  const isAdmin = cache["isAdmin"];
  const userName = cache["userName"];

  return (
    <Navbar
      variant="dark"
      bg="primary"
      expand="md"
      style={{ minHeight: "10vh", margin: "0rem" }}
      collapseOnSelect
    >
      <Container fluid style={{ justifyContent: "space-between" }}>
        <Navbar.Brand href="#">
          <LogoImage src={process.env.PUBLIC_URL + "/logo.png"} />
          Pâtisserie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
          <NavWrapper>
            <Nav style={{ gap: "1.5rem" }}>
              <NavLink as={Link} to="/">
                Home
              </NavLink>
              <NavLink as={Link} to="/menu">
                Menu
              </NavLink>
              <NavLink as={Link} to="/about">
                About
              </NavLink>
              <NavLink as={Link} to="/cart">
                <Cart />
                Cart
              </NavLink>
              {userName ? (
                <NavLink as={Link} to="/profile">
                  <PersonCircle />
                  Profile
                </NavLink>
              ) : (
                <NavLink as={Link} to="/login">
                  <PersonDown />
                  Login
                </NavLink>
              )}
              {isAdmin ? (
                <NavLink as={Link} to="/admin/products">
                  <Gear />
                  Admin
                </NavLink>
              ) : null}
            </Nav>
          </NavWrapper>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
