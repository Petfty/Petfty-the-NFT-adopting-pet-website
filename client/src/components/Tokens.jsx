import React from 'react'
import styled from 'styled-components';

const TokenContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000db;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
`;

export default function Tokens() {
  return (
  <TokenContainer>
    Tokens
  </TokenContainer>
  )
}
