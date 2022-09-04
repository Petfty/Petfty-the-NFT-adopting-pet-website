import React from 'react'
import styled from 'styled-components'
import TopBar from '../components/TopBar';
import Tokens from '../components/Tokens';

const MyPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #0000000;
`;

export default function MyPage(props) {
  const { myAddress, myBalance, user, showModal, modalProps, setShowModal, setModalProps } = props;

  return (
	 <>
    <TopBar myAddress={myAddress} myBalance={myBalance} user={user}>
    </TopBar>
    <MyPageContainer>
      <Tokens isMarket={false} Address={myAddress} showModal={showModal} modalProps={modalProps} setShowModal={setShowModal} setModalProps={setModalProps}></Tokens>
    </MyPageContainer>
   </>
  )
}
