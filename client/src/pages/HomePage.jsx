import { React } from "react";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import QR from "../components/QR";
import Tokens from "../components/Tokens";

const HomePageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #0000000;
`;

export default function HomePage(props) {
  const { myAddress, myBalance, user, setMyAddress, setBalance, setUser } =
    props;

  return (
    <>
      <TopBar myAddress={myAddress} myBalance={myBalance} user={user}/>
      <HomePageContainer>
        <QR
          setMyAddress={setMyAddress}
          setBalance={setBalance}
          setUser={setUser}
          user={user}
        />
        <Tokens />
      </HomePageContainer>
    </>
  );
}
