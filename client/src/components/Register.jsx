import axios from 'axios';
import {React, useRef} from 'react'
import { useNavigate } from "react-router"
import styled from "styled-components";

const RegisterContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000c2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
`;

const RegisterBox = styled.form`
	height: 300px;
	padding: 20px;
	background-color: #00000054;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const RegisterInput = styled.input`
	height: 50px;
	border-radius: 10px;
	border: 1px solid grey;
	font-size: 18px;
	padding-left: 20px;
`;

const RegisterButton = styled.button`
	height: 50px;
	border-radius: 10px;
	border: none;
	background-color: #898a8d;
	color: white;
	font-size: 20px;
	font-weight: 500;
	cursor: pointer;
`;

export default function Register(props) {
	const { myAddress } = props
	const username = useRef();
	const walletAddress = useRef()
	const navigate = useNavigate();
	const handleClick = async (e) => {
		e.preventDefault();
		const user = {
			username: username.current.value, 
			walletAddress: walletAddress.current.value,
		}
		try {
			const response = await axios.post("/auth/register", user);
			console.log(response.data)
			alert("Sign Up Successful");
			navigate("/");
		} catch (err) {
			alert(err);
			console.log(err);
		}
	}
  return (
	<RegisterContainer>
		<RegisterBox onSubmit={handleClick}>
			<RegisterInput placeholder="Username" required ref={username}/>
			<RegisterInput placeholder='walletAddress' required ref={walletAddress} type="text" defaultValue={myAddress} />
			<RegisterButton type="submit">Sign Up</RegisterButton>
		</RegisterBox>
	</RegisterContainer>
  )
}
