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
import { ArrowLeft, Trash } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { loadOrderDetails, modifyOrderDetails } from "./orderEditHelper";

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

export default function OrderEdit() {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState({});
  const [productEntries, setProductEntries] = useState([]);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [coupon, setCoupon] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [orderStatus, setOrderStatus] = useState("");
  const [deliveredAt, setDeliveredAt] = useState(null);
  const { selectedOrder } = useParams();
  const navigate = useNavigate();

  const [productEntry, setProductEntry] = useState([]);
  const addEntry = () => setProductEntries([...productEntries, productEntry]);
  const clearEntry = () => setProductEntries([]);

  const prevView = () => navigate(-1);

  const modifyOrder = async () => {
    await modifyOrderDetails(
      selectedOrder,
      userName,
      address,
      productEntries,
      shippingCharge,
      coupon,
      paymentMethod,
      orderStatus,
      deliveredAt
    );
    setTimeout(() => null, 500);
    prevView();
  };

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
      <BlockEnclosure>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button variant="" style={{ padding: "0" }} onClick={prevView}>
            <ArrowLeft size={"2rem"} />
          </Button>
          <h3>Edit Order</h3>
        </div>
        <Form style={{ display: "grid", gap: ".5rem" }}>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormControl
              type="text"
              defaultValue={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Address(Street)</FormLabel>
            <FormControl
              type="text"
              defaultValue={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
            <FormLabel>Address(City)</FormLabel>
            <FormControl
              type="text"
              defaultValue={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <FormLabel>Address(Pincode)</FormLabel>
            <FormControl
              type="text"
              defaultValue={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
            <FormLabel>Address(State)</FormLabel>
            <FormControl
              type="text"
              defaultValue={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productEntries.map((productEntry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{productEntry.productId}</td>
                    <td>{productEntry.price}</td>
                    <td>{productEntry.size}</td>
                    <td>{productEntry.quantity}</td>
                    <td>
                      <Button
                        onClick={() =>
                          setProductEntries(
                            productEntries.filter((val, inx) =>
                              inx !== index ? val : null
                            )
                          )
                        }
                      >
                        <Trash size="1.25rem" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableDecorator>
          <FormGroup
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "2px solid #c0c0c0",
              padding: "2rem",
              margin: "1rem",
            }}
          >
            <h4>Create new Product:</h4>
            <FormGroup
              style={{
                display: "grid",
                gridTemplateColumns: ".5fr 1fr .5fr 1fr",
                justifyItems: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <FormLabel>Product Id</FormLabel>
              <FormControl
                type="text"
                onChange={(e) =>
                  setProductEntry({
                    ...productEntry,
                    productId: e.target.value,
                  })
                }
              />
              <FormLabel>Price</FormLabel>
              <FormControl
                type="text"
                onChange={(e) =>
                  setProductEntry({
                    ...productEntry,
                    price: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup
              style={{
                display: "grid",
                gridTemplateColumns: ".5fr 1fr .5fr 1fr",
                justifyItems: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <FormLabel>Size</FormLabel>
              <FormControl
                id="productSize"
                type="text"
                onChange={(e) =>
                  setProductEntry({
                    ...productEntry,
                    size: e.target.value,
                  })
                }
              />
              <FormLabel>Quantity</FormLabel>
              <FormControl
                id="productQuantity"
                type="text"
                onChange={(e) =>
                  setProductEntry({
                    ...productEntry,
                    quantity: e.target.value,
                  })
                }
              />
            </FormGroup>
            <ButtonGroup style={{ gap: "1.5rem" }}>
              <Button onClick={clearEntry} style={{ backgroundColor: "white" }}>
                Clear
              </Button>
              <Button variant="primary" onClick={addEntry}>
                Add
              </Button>
            </ButtonGroup>
          </FormGroup>

          <FormGroup>
            <FormLabel>Shipping Charges</FormLabel>
            <FormControl
              type="number"
              value={shippingCharge}
              onChange={(e) => setShippingCharge(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Coupon(Name)</FormLabel>
            <FormControl
              type="text"
              defaultValue={coupon ? coupon.name : ""}
              onChange={(e) => setCoupon({ ...coupon, name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Coupon(Discount)</FormLabel>
            <FormControl
              type="text"
              defaultValue={coupon ? coupon.discount : ""}
              onChange={(e) =>
                setCoupon({ ...coupon, discount: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Coupon(MaxCap)</FormLabel>
            <FormControl
              type="text"
              defaultValue={coupon ? coupon.maxCap : ""}
              onChange={(e) => setCoupon({ ...coupon, maxCap: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Payment Method</FormLabel>
            <FormSelect
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Online">Online</option>
              <option value="Cash on delivery">Cash on delivery</option>
            </FormSelect>
          </FormGroup>
          <FormGroup>
            <FormLabel>Status</FormLabel>
            <FormSelect
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
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
              onChange={(e) => setDeliveredAt(e.target.value)}
            />
          </FormGroup>

          <ButtonGroup style={{ gap: "2rem" }}>
            <Button type="reset" style={{ backgroundColor: "white" }}>
              Clear
            </Button>
            <Button onClick={modifyOrder}> Save</Button>
          </ButtonGroup>
        </Form>
      </BlockEnclosure>
    </>
  );
}
