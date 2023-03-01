import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button, FormSelect } from "react-bootstrap";
import styled from "styled-components";
import { CacheContext } from "../../cacheProvider";

async function getAllAddress(userName) {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  try {
    const res = await axiosInstance.get(`/api/addresses/${userName}`);
    const addresses = res.data.addresses;
    console.log("Address Selector:", res.data);
    console.log("Const Addresses:", addresses);
    return res.data.addresses;
  } catch (err) {
    console.log(err);
    return [];
  }
}

const Container = styled.section`
  display: grid;
  align-items: baseline;
  gap: 0.25rem;
  margin: 0rem 1rem;
  padding: 3rem 4rem;
  border: 0.0625rem solid var(--bs-gray-400);
  border-radius: 0.5rem;
  background-color: var(--bs-white);
  hr {
    margin: 2rem 1rem;
  }
`;

export default function AddressSelector({ setShippingAddress }) {
  const cacheContext = useContext(CacheContext);
  const userName = cacheContext.cache["userName"];
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const getSelectedAddress = () => {
    const address = addresses.find(
      (address) => address._id === selectedAddress
    );
    return address ? address : {};
  };

  useEffect(() => {
    getAllAddress(userName)
      .then((addressList) => {
        console.log("AddressList: ", addressList);
        setAddresses(addressList);
        setSelectedAddress(addressList.at(0)._id);
        setShippingAddress(addressList.at(0));
        console.log("Selected Address:", selectedAddress);
        console.log("Shipping Address:", getSelectedAddress());
      })
      .catch((err) => console.log(err));
  }, [userName]);

  return (
    <Container>
      <h3>Delivery Address:</h3>
      {addresses.length ? (
        <>
          <FormSelect
            value={selectedAddress}
            onChange={(evt) => {
              console.log("Selected Adddress:", selectedAddress);
              setSelectedAddress(evt.target.value);
              setShippingAddress(getSelectedAddress());
            }}
          >
            {addresses.map((address) => (
              <option value={address._id}>{address.id}</option>
            ))}
          </FormSelect>
          <hr />
          <p>{`Street: ${getSelectedAddress().street}`}</p>
          <p>{`City: ${getSelectedAddress().city}`}</p>
          <p>{`Pincode: ${getSelectedAddress().pincode}`}</p>
          <p>{`State: ${getSelectedAddress().state}`}</p>
        </>
      ) : (
        <div style={{ display: "grid", justifyItems: "center", gap: "0.5rem" }}>
          <h4>No address available!</h4>
          <p>Please add an address by going to Profile page</p>
          <Button variant="outline-secondary" href="/profile">
            Profile Page
          </Button>
        </div>
      )}
    </Container>
  );
}
