import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Eye, Pencil, Trash } from "react-bootstrap-icons";
import styled from "styled-components";
import { loadAllCouponDetails } from "./couponListHelper";
import DeleteCouponPopUp from "../deleteCouponPopUp";
import { Link } from "react-router-dom";

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

export default function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);

  const [showDeletePopUp, hideDeletePopUp] = [
    (item) => {
      setDeletePopUp(true);
      setSelectedCoupon(item.name);
    },
    () => {
      setSelectedCoupon("");
      setDeletePopUp(false);
    },
  ];

  useEffect(() => {
    loadAllCouponDetails()
      .then((retrivedCoupons) => setCoupons(retrivedCoupons))
      .catch((err) => console.log(err));
  }, [deletePopUp]);

  return (
    <>
      <DeleteCouponPopUp
        selectedCoupon={selectedCoupon}
        viewState={deletePopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <h3>Coupons</h3>
        <Table striped style={{ border: "0.0625rem solid #c0c0c0" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Discount</th>
              <th>MaxCap</th>
              <th>ModifiedAt</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{coupon.name}</td>
                <td>{coupon.discount}</td>
                <td>{coupon.maxCap}</td>
                <td>{new Date(coupon.updatedAt).toLocaleString()}</td>
                <td>{new Date(coupon.createdAt).toLocaleString()}</td>
                <td style={{ display: "flex", gap: "0.25rem" }}>
                  <Button
                    className="view-btn"
                    as={Link}
                    to={`/admin/coupons/view/${coupon.name}`}
                  >
                    <Eye />
                  </Button>
                  <Button
                    className="edit-btn"
                    as={Link}
                    to={`/admin/coupons/edit/${coupon.name}`}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="delete-btn"
                    onClick={() => showDeletePopUp(coupon)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button varient="primary" as={Link} to={`/admin/coupons/create`}>
          Create Coupon
        </Button>
      </BlockEnclosure>
    </>
  );
}
