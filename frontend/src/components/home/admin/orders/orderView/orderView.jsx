import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Table,
} from "react-bootstrap";
import { ArrowLeft, Pencil, Trash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteOrderPopUp from "../deleteOrderPopUp";
import { loadOrderDetails } from "./orderViewHelper";

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

const TableDecorator = styled.div`
  border: 2px solid #c0c0c0;
  padding: 2rem;
  margin: 1rem;
  display: grid;
  gap: 1rem;
`;

export default function OrderView() {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState([]);
  const [productEntries, setProductEntries] = useState([]);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [coupon, setCoupon] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [orderStatus, setOrderStatus] = useState("");
  const [deliveredAt, setDeliveredAt] = useState();
  const [deletedPopUp, setDeletePopUp] = useState(false);
  const { selectedOrder } = useParams();
  const navigate = useNavigate();

  const prevView = () => navigate(-1);
  const [showDeletePopUp, hideDeletePopUp] = [
    () => setDeletePopUp(true),
    (item) => {
      setDeletePopUp(false);
      if (item.isDeleted) prevView();
    },
  ];

  useEffect(() => {
    loadOrderDetails(selectedOrder).then((retrievedOrder) => {
      setUserName(retrievedOrder.userName);
      setAddress(retrievedOrder.address);
      setProductEntries(retrievedOrder.items);
      setShippingCharge(retrievedOrder.shippingCharge);
      setCoupon(retrievedOrder.coupon);
      setPaymentMethod(retrievedOrder.paymentMethod);
      setOrderStatus(retrievedOrder.status);
      setDeliveredAt(retrievedOrder.deliveredAt.slice(0, -1));
    });
  }, [selectedOrder]);

  return (
    <>
      <DeleteOrderPopUp
        selectedOrder={selectedOrder}
        viewState={deletedPopUp}
        hidePopUp={hideDeletePopUp}
      />
      <BlockEnclosure>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="" style={{ padding: "0" }} onClick={prevView}>
            <ArrowLeft size={"2rem"} />
          </Button>
          <h3>View Order</h3>
        </div>
        <Form style={{ display: "grid", gap: ".5rem" }}>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl type="text" readOnly disabled value={userName} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Address(Street)</FormLabel>
            <FormControl type="text" readOnly disabled value={address.street} />
            <FormLabel>Address(City)</FormLabel>
            <FormControl type="text" readOnly disabled value={address.city} />
            <FormLabel>Address(Pincode)</FormLabel>
            <FormControl
              type="text"
              readOnly
              disabled
              value={address.pincode}
            />
            <FormLabel>Address(State)</FormLabel>
            <FormControl type="text" readOnly disabled value={address.state} />
          </FormGroup>
          <TableDecorator>
            <h3>Product Entries</h3>
            <Table hover style={{ border: "2px solid #c0c0c0" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Id</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {productEntries.map((productEntry, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{productEntry.productId}</td>
                    <td>{productEntry.price}</td>
                    <td>{productEntry.size}</td>
                    <td>{productEntry.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableDecorator>

          <FormGroup>
            <FormLabel>Shipping Charges</FormLabel>
            <FormControl
              type="number"
              readOnly
              disabled
              value={shippingCharge}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Coupon(Name)</FormLabel>
            <FormControl
              type="text"
              readOnly
              disabled
              value={coupon ? coupon["name"] : ""}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Coupon(Discount)</FormLabel>
            <FormControl
              type="text"
              readOnly
              disabled
              value={coupon ? coupon["discount"] : ""}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Coupon(MaxCap)</FormLabel>
            <FormControl
              type="text"
              readOnly
              disabled
              value={coupon ? coupon["maxCap"] : ""}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Payment Method</FormLabel>
            <FormSelect type="text" disabled value={paymentMethod}>
              <option value="Online">Online</option>
              <option value="Cash on delivery">Cash on delivery</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Status</FormLabel>
            <FormSelect value={orderStatus} disabled>
              <option value="Preparing">Preparing</option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
            </FormSelect>
          </FormGroup>

          <FormGroup style={{ marginBottom: ".5rem" }}>
            <FormLabel>DeliveredAt</FormLabel>
            <FormControl
              type="datetime-local"
              value={deliveredAt}
              readOnly
              disabled
            />
          </FormGroup>

          <ButtonGroup style={{ gap: "2rem" }}>
            <Button
              style={{ backgroundColor: "white" }}
              onClick={showDeletePopUp}
            >
              <Trash />
              Delete
            </Button>
            <Button as={Link} to={`/admin/orders/edit/${selectedOrder}`}>
              <Pencil /> Edit
            </Button>
          </ButtonGroup>
        </Form>
      </BlockEnclosure>
    </>
  );
}
