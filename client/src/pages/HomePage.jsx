import { React } from "react";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import Login from "../components/Login";
import Tokens from "../components/Tokens";
import Modals from "../components/Modals";

const HomePageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #0000000;
`;

export default function HomePage(props) {
  const {
    myAddress,
    myBalance,
    user,
    setMyAddress,
    setBalance,
    setUser,
    showModal,
    modalProps,
    setShowModal,
    setModalProps,
  } = props;

  return (
    <>
      <Modals
        showModal={showModal}
        modalProps={modalProps}
        setShowModal={setShowModal}
        setModalProps={setModalProps}
      />

      <TopBar myAddress={myAddress} myBalance={myBalance} user={user} />
      <HomePageContainer>
        <Login
          setMyAddress={setMyAddress}
          setBalance={setBalance}
          setUser={setUser}
          user={user}
        />
        <Tokens
          isMarket={true}
          Address={myAddress}
          showModal={showModal}
          modalProps={modalProps}
          setShowModal={setShowModal}
          setModalProps={setModalProps}
          user={user}
        ></Tokens>
      </HomePageContainer>
    </>
  );
}
