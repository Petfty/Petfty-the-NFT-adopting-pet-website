import {React, useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import QR from "../components/QR";
import Tokens from "../components/Tokens";

// const HomePageContainer = styled.div`
//   height: 100%;
//   width: 100%;
//   background-color: #000000c2;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   position: sticky;
//   top: 0;
// `;

export default function HomePage() {
  const [myAddress, setMyAddress] = useState("0x00000000000000000000");
  const [myBalance, setBalance] = useState(0);
  return (
    <>
      <TopBar myAddress={myAddress} myBalance={myBalance}/>
      <QR setMyAddress={setMyAddress}/>
      <Tokens />
    </>
  );
}
