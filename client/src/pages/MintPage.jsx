import React from 'react'
import TopBar from '../components/TopBar';
import Mint from '../components/Mint';
import styled from 'styled-components'

const MintPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #0000000;
`;

export default function MintPage(props) {
  const { myAddress, myBalance, user } = props;
  return (
    <>
      <TopBar myAddress={myAddress} myBalance={myBalance} user={user}>
      </TopBar>
      <MintPageContainer>
        <Mint myAddress={myAddress}></Mint>
      </MintPageContainer>
    </>
  )
}
