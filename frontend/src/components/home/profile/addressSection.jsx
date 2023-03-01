import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, FormControl, FormLabel, ToggleButton } from "react-bootstrap";
import {
  PencilSquare,
  PlusSquare,
  Save,
  Trash,
  XSquare,
} from "react-bootstrap-icons";
import styled from "styled-components";
import { CacheContext } from "../../../cacheProvider";

async function getAllAddress(userName) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let addresses = [];
  try {
    const res = await axiosInstance.get(`/api/addresses/${userName}`);
    addresses = res.data.addresses ? res.data.addresses : [];
    console.log("ResData:", res.data);
  } catch (err) {
    console.log(err);
  }

  return addresses;
}

async function createAddress(address) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  console.log("Sending this addr:", address);

  try {
    const res = await axiosInstance.post(`/api/addresses/`, address);
    console.log("resData:", res.data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteAddress(addressId) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  try {
    const res = await axiosInstance.delete(`/api/addresses/${addressId}`);
    console.log("ResData:", res.data);
  } catch (err) {
    console.log(err);
  }
}

async function updateAddress(addressId, address) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
  try {
    const res = await axiosInstance.put(`/api/addresses/${addressId}`, address);
    console.log("resData", res.data);
  } catch (err) {
    console.log(err);
  }
}

const Container = styled.section`
  display: grid;
  gap: 1rem;
  margin: 0rem 1rem;
  padding: 0rem 1rem;
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: space-between;
  padding: 2rem 4rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
`;

const AddressWrapper = styled.address`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  align-items: center;
  padding: 2rem 4rem;
  margin: 0rem;
  background-color: var(--bs-white);
  border: 0.0625rem solid
    ${(props) => (props.highlight ? "var(--bs-primary)" : "var(--bs-gray-400)")};
  border-radius: 0.5rem;
`;

const initialAddress = { id: "", street: "", city: "", pincode: "", state: "" };
export function AddressSection() {
  const cacheContext = useContext(CacheContext);
  const userName = cacheContext.cache["userName"];
  const [addressList, setAddressList] = useState([]);
  const [newEntry, setNewEntry] = useState(false);
  const [newAddress, setNewAddress] = useState(initialAddress);
  const [refresh, setRefresh] = useState(true);

  // ? Improve the below function
  const changeAddressList = (id, newAddress) =>
    setAddressList(
      addressList.map((address) =>
        address._id === id ? { ...address, ...newAddress } : address
      )
    );
  const toggleIsDisabled = (id, val) =>
    changeAddressList(id, { isDisabled: !val });

  useEffect(() => {
    if (!refresh) return;

    setRefresh(false);
    const dataLoader = async () => {
      let addresses = await getAllAddress(userName);
      addresses = addresses.map((address) => {
        address["isDisabled"] = true;
        console.log("Modified Addresses:", addresses);
        return address;
      });
      setAddressList(addresses);
    };
    dataLoader();
    return () => {};
  }, [refresh]);

  return (
    <Container>
      <Title>
        <h3>Addresses</h3>
        <Button
          onClick={() => {
            setNewEntry(!newEntry);
            setRefresh(true);
          }}
          variant="none"
          style={{ justifySelf: "center" }}
        >
          {newEntry ? <XSquare size={"2rem"} /> : <PlusSquare size={"2rem"} />}
        </Button>
      </Title>
      {addressList.map((address) => (
        <AddressWrapper key={address.id}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "9fr 1fr 1fr",
              gridColumn: "span 2",
            }}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: "8fr 1fr 1fr" }}
            >
              <h4>ID: {address.id}</h4>
              <Button
                variant="none"
                onClick={async () => {
                  await deleteAddress(address._id);
                  setRefresh(true);
                }}
              >
                <Trash size="2rem" color="var(--bs-secondary)" />
              </Button>
              <ToggleButton
                variant="none"
                value={address.isDisabled}
                onClick={async () => {
                  toggleIsDisabled(address._id, address.isDisabled);
                  if (!address.isDisabled) {
                    await updateAddress(address._id, address);
                  }
                }}
              >
                {address.isDisabled ? (
                  <PencilSquare size="2rem" color="var(--bs-primary)" />
                ) : (
                  <Save size="2rem" color="var(--bs-primary)" />
                )}
              </ToggleButton>
            </div>
          </div>
          <hr style={{ gridColumn: "span 2" }} />
          <FormLabel>Street:</FormLabel>
          <FormControl
            type="text"
            disabled={address.isDisabled}
            value={address.street}
            onChange={(e) =>
              changeAddressList(address._id, { street: e.target.value })
            }
          />
          <FormLabel>City:</FormLabel>
          <FormControl
            type="text"
            disabled={address.isDisabled}
            value={address.city}
            onChange={(e) =>
              changeAddressList(address._id, { city: e.target.value })
            }
          />
          <FormLabel>Pincode:</FormLabel>
          <FormControl
            type="text"
            disabled={address.isDisabled}
            value={address.pincode}
            onChange={(e) =>
              changeAddressList(address._id, { pincode: e.target.value })
            }
          />
          <FormLabel>State:</FormLabel>
          <FormControl
            type="text"
            disabled={address.isDisabled}
            value={address.state}
            onChange={(e) =>
              changeAddressList(address._id, { state: e.target.value })
            }
          />
        </AddressWrapper>
      ))}

      {newEntry ? (
        <AddressWrapper highlight>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "9fr 1fr 1fr",
              gridColumn: "span 2",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 7fr 1fr",
                alignItems: "center",
              }}
            >
              <h4>ID:</h4>
              <FormControl
                type="text"
                value={newAddress.id}
                placeholder="eg. Home,Office,etc"
                onChange={(e) =>
                  setNewAddress({ ...newAddress, id: e.target.value })
                }
              />
              <Button
                variant="none"
                onClick={async () => {
                  const address = { ...newAddress, userName };
                  await createAddress(address);
                  setNewEntry(false);
                  setNewAddress(initialAddress);
                  setRefresh(true);
                }}
              >
                <Save size="2rem" color="var(--bs-primary)" />
              </Button>
            </div>
          </div>
          <hr style={{ gridColumn: "span 2" }} />
          <FormLabel>Street:</FormLabel>
          <FormControl
            type="text"
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({ ...newAddress, street: e.target.value })
            }
          />
          <FormLabel>City:</FormLabel>
          <FormControl
            type="text"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
          />
          <FormLabel>Pincode:</FormLabel>
          <FormControl
            type="text"
            value={newAddress.pincode}
            onChange={(e) =>
              setNewAddress({ ...newAddress, pincode: e.target.value })
            }
          />
          <FormLabel>State:</FormLabel>
          <FormControl
            type="text"
            value={newAddress.state}
            onChange={(e) =>
              setNewAddress({ ...newAddress, state: e.target.value })
            }
          />
        </AddressWrapper>
      ) : null}
    </Container>
  );
}
