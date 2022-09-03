import React from 'react'
import TopBar from '../components/TopBar'

export default function RegisterPage(props) {
  const { myAddress } = props;
  return (
    <>
      <TopBar myAddress={myAddress}/>
    </>
    
  )
}
