import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import QR from "./QR";
import styled from "styled-components";

const TopBarContainer = styled.div`
  height: 80px;
  width: 100%;
  background-color: #00000097;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const TopBarLeft = styled.div`
  border: none;
	padding: 5px;
	border-radius: 5px;
	background-color: #000000ac;
	font-weight: 500;
	margin-left: 20px;
  margin-right: 50px;
	color: white;
  flex: 3.7;
`;

const TopBarCenter = styled.div`
  flex: 3;
`;

const Logo = styled.div`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const TopBarRight = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`;

// const Button = styled.div`
//   border: none;
//   padding: 7px;
//   border-radius: 5px;
//   background-color: #000000c4;
//   font-weight: 500;
//   margin-right: 20px;
//   cursor: pointer;
//   color: white;
// `;

export default function TopBar(props) {
  const { myAddress, myBalance } = props;
  const { user } = useContext(AuthContext);
  return (
    <TopBarContainer>
      <TopBarLeft>
        Address: {myAddress} <br />
        Balance: {myBalance}
      </TopBarLeft>
      <TopBarCenter>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>PETFTY</Logo>
        </Link>
      </TopBarCenter>
      <TopBarRight />
    </TopBarContainer>
  );
}
