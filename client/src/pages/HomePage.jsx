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

export default function HomePage(props) {
  const { myAddress, myBalance, user, setMyAddress, setBalance, setUser } = props;
  
  return (
    <>
      <TopBar myAddress={myAddress} myBalance={myBalance}/>
      <QR setMyAddress={setMyAddress} setBalance={setBalance} setUser={setUser} user={user}/>
      <Tokens />
    </>
  );
}
