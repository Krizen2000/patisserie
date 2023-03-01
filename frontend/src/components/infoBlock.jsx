import styled from "styled-components";
import { Facebook, Instagram, Pinterest, Twitter } from "react-bootstrap-icons";
import { Visa, Mastercard, Googlepay } from "react-pay-icons";
import { useState } from "react";

const BasicWrapper = styled.div`
  display: grid;
  h2 {
    margin-bottom: 0.5em;
  }
`;

const DetailsWrapper = styled.address`
  display: grid;
  justify-content: space-around;
  align-items: baseline;
  padding: 0.5rem;
  h2 {
    margin-bottom: 0.5em;
  }
`;

const SocialIconWrapper = styled.div`
  display: grid;
  svg {
    height: ${({ iconSize }) => iconSize};
    width: ${({ iconSize }) => iconSize};
    margin-right: 0.5em;
  }
`;

const PaymentIconWrapper = styled.div`
  display: flex;
  gap: 1rem;
  svg {
    height: ${({ iconSize }) => iconSize};
    width: ${({ iconSize }) => iconSize};
  }
`;

const TextWrapper = styled.p`
  color: white;
  background-color: #1d1d1d;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 3rem;
  margin: 0rem;
`;

const BlockWrapper = styled.div`
  background-color: #e1e1e1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem;
`;

const ContactUs = () => {
  return (
    <DetailsWrapper>
      <h2>Contact Us</h2>
      <h4>Phone Number:</h4>
      <p>+000-0000-000</p>
      <h4>Mobile Number:</h4>
      <p>+9789-132424</p>
      <h4>Address:</h4>
      <p>689 Young Avenue Rosemount, MN 55068</p>
    </DetailsWrapper>
  );
};

const FollowUs = () => {
  const initialState = {
    twitter: "black",
    instagram: "black",
    facebook: "black",
    pinterest: "black",
  };
  const [currentColor, setCurrentColor] = useState(initialState);
  const clearColor = () => setCurrentColor(initialState);
  const setNewColor = (props) => setCurrentColor({ ...initialState, ...props });

  const changeSpeed = { transition: ".5s" };

  return (
    <DetailsWrapper>
      <h2>Follow Us</h2>
      <SocialIconWrapper iconSize="2.5rem">
        <p
          onMouseOver={() => setNewColor({ twitter: "blue" })}
          onMouseLeave={clearColor}
        >
          <Twitter color={currentColor.twitter} style={changeSpeed} />
          Twitter
        </p>
        <p
          onMouseOver={() => setNewColor({ instagram: "red" })}
          onMouseLeave={clearColor}
        >
          <Instagram color={currentColor.instagram} style={changeSpeed} />
          Instagram
        </p>
        <p
          onMouseOver={() => setNewColor({ facebook: "blue" })}
          onMouseLeave={clearColor}
        >
          <Facebook color={currentColor.facebook} style={changeSpeed} />
          Facebook
        </p>
        <p
          onMouseOver={() => setNewColor({ pinterest: "red" })}
          onMouseLeave={clearColor}
        >
          <Pinterest color={currentColor.pinterest} style={changeSpeed} />
          Pinterest
        </p>
      </SocialIconWrapper>
    </DetailsWrapper>
  );
};

const PaymentGateway = () => {
  return (
    <BasicWrapper>
      <h2>Payment Gateway</h2>
      <PaymentIconWrapper iconSize="80px">
        <Visa />
        <Mastercard />
        <Googlepay />
      </PaymentIconWrapper>
    </BasicWrapper>
  );
};

const CopyRight = () => {
  return (
    <TextWrapper>CopyRight @2022 Pâtisserie. All rights reserved</TextWrapper>
  );
};

export default function InfoBlock() {
  return (
    <>
      <BlockWrapper>
        <ContactUs />
        <FollowUs />
        <PaymentGateway />
      </BlockWrapper>
      <CopyRight />
    </>
  );
}
