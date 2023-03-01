import React, { useContext } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlockEnclosure = styled.div.attrs({ className: "sidebar" })`
  padding: 1rem;
  background-color: #808080;
  .nav {
    display: grid;
    justify-content: center;
    align-items: center;
    max-width: 10rem;
    gap: 2rem;
  }
`;

export default function SideBar() {
  return (
    <BlockEnclosure>
      <TabContainer defaultActiveKey={"products"}>
        <Nav variant="pills">
          <NavItem>
            <NavLink as={Link} to="/admin/products" eventKey={"products"}>
              Products
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} to="/admin/coupons" eventKey={"coupons"}>
              Coupons
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} to="/admin/users" eventKey={"users"}>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} to="/admin/orders" eventKey={"orders"}>
              Orders
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} to="/admin/reviews" eventKey={"reviews"}>
              Reviews
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey={"products"} />
          <TabPane eventKey={"coupons"} />
          <TabPane eventKey={"users"} />
          <TabPane eventKey={"orders"} />
          <TabPane eventKey={"reviews"} />
        </TabContent>
      </TabContainer>
    </BlockEnclosure>
  );
}
