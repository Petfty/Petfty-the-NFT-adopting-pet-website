import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router";

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
  flex: 7;
`;

const TopBarCenter = styled.div`
  flex: 5;
`;

const Logo = styled.div`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const TopBarRight = styled.div`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #000000ac;
  font-weight: 500;
  margin-left: 20px;
  margin-right: 50px;
  color: white;
  flex: 3;
`;

const Button = styled.div`
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: #000000c4;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  color: white;
`;

export default function TopBar(props) {
  const { myAddress, myBalance, user } = props;
  const navigate = useNavigate();
  return (
    <TopBarContainer>
      {user ? (
        <TopBarLeft>Address: {myAddress}</TopBarLeft>
      ) : (
        <TopBarLeft>Please Login Or Register</TopBarLeft>
      )}
      <TopBarCenter>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>PETFTY</Logo>
        </Link>
      </TopBarCenter>
      {user ? (
        <>
          <TopBarRight>Balance: {myBalance}</TopBarRight>
          <Button
            onClick={() => {
              navigate("/myPage/" + user);
            }}
          >
            MY PAGE
          </Button>
        </>
      ) : (
        <TopBarRight></TopBarRight>
      )}
    </TopBarContainer>
  );
}
