import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteOrderPopUp from "../deleteOrderPopUp";
import { loadAllOrdersDetails } from "./orderListHelper";

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

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);

  const [showDeletePopUp, hideDeletePopUp] = [
    (item) => {
      setDeletePopUp(true);
      setSelectedOrder(item._id);
    },
    () => {
      setSelectedOrder("");
      setDeletePopUp(false);
    },
  ];

  useEffect(() => {
    loadAllOrdersDetails()
      .then((retrivedOrders) => setOrders(retrivedOrders))
      .catch((err) => console.log(err));
  }, [deletePopUp]);

  return (
    <>
      <DeleteOrderPopUp
        selectedOrder={selectedOrder}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <h3>Orders</h3>
        <Table striped style={{ border: "0.0625rem solid #c0c0c0" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Pincode</th>
              <th>Item Varients</th>
              <th>Coupon</th>
              <th>CreatedAt</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, inx) => (
              <tr key={order._id}>
                <td>{inx + 1}</td>
                <td>{order.userName}</td>
                <td>{order.address.pincode}</td>
                <td>{order.items.length}</td>
                <td>{order.coupon ? order.coupon.name : "None"}</td>
                <td>{order.updatedAt}</td>
                <td>{order.status}</td>
                <td style={{ display: "flex", gap: "0.25rem" }}>
                  <Button
                    className="view-btn"
                    as={Link}
                    to={`/admin/orders/view/${order._id}`}
                  >
                    <Eye />
                  </Button>
                  <Button
                    className="edit-btn"
                    as={Link}
                    to={`/admin/orders/edit/${order._id}`}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="delete-btn"
                    as={Link}
                    onClick={() => showDeletePopUp(order)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button varient="primary" as={Link} to={`/admin/orders/create`}>
          Create Order
        </Button>
      </BlockEnclosure>
    </>
  );
}
