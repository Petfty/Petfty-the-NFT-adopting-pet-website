import React from "react";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import Register from "../components/Register";

const RegisterPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #0000000;
`;

export default function RegisterPage(props) {
  const { myAddress } = props;
  return (
    <>
      <TopBar myAddress={myAddress} />
      <RegisterPageContainer>
        <Register myAddress={myAddress}/>
      </RegisterPageContainer>
    </>
  );
}
