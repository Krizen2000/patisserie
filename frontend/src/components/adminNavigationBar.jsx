import React from "react";
import { Container, Nav, NavLink } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export default function AdminNavigationBar() {
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
              <div className="vr" />
              <NavLink as={Link} to="/admin/products">
                Products
              </NavLink>
              <NavLink as={Link} to="/admin/coupons">
                Coupons
              </NavLink>
              <NavLink as={Link} to="/admin/users">
                Users
              </NavLink>
              <NavLink as={Link} to="/admin/orders">
                Orders
              </NavLink>
              <NavLink as={Link} to="/admin/reviews">
                Reviews
              </NavLink>
            </Nav>
          </NavWrapper>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
