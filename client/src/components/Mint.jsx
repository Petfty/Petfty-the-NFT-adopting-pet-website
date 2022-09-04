import { React, useState, useRef } from "react";
import QRCode from "qrcode.react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const QRContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000c2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
`;

const QRCodeContainer = styled.div`
  height: 300;
  width: 300;
  background-color: white;
  padding: 20;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
`;

const QRLeftBar = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QRRigntBar = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MintContainer = styled.div`
  height: 400px;
  width: 100%;
  background-color: #0000007b;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: sticky;
  margin-left: 60px;
  margin-right: 60px;
  top: 0;
`;

const MintBox = styled.form`
  height: 300px;
  background-color: #00000054;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MintInput = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid grey;
  font-size: 18px;
  margin-bottom: 15px;
  padding-left: 20px;
  justify-content: center;
`;

const MintCheckInput = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid grey;
  font-size: 18px;
  margin-bottom: 15px;
  padding-left: 20px;
  justify-content: center;
  margin-left: 50px;
`;

const MintCheck = styled.label`
  height: 50px;
  color: white;
  font-size: 18px;
  padding-left: 20px;
  margin-bottom: 25px;
  margin-top: -25px;
`;

const MintButton = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #898a8d;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const getRandomArbitrary = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const DEFAULT_QR_CODE = "DEFAULT";

export default function Mint(props) {
	const {myAddress} = props;
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const petName = useRef();
  const animalKind = useRef();
  const species = useRef();
  const bornDate = useRef();
  const isVaccinated = useRef();

  const MintQR = (petInfo) => {
	let request_key = null;
	try {
		axios.put("/tokens/createTokenURL", petInfo).then((res) => {
		  setQrvalue(res.data.url + res.data.request_key);
		  request_key = res.data.request_key;
		  let timeId = setInterval(() => {
			axios
			  .get(
				`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
			  )
			  .then((res) => {
				if (res.data.result) {
				  console.log(`[result] ${JSON.stringify(res.data.result)}`);
				  clearInterval(timeId);
				  setQrvalue("DEFAULT");
				  alert("Mint Successful")
				  navigate("/mypage/"+myAddress);
				}
			  });
		  }, 1000);
		});
	  } catch (err) {
		console.log(err.response.data);
	  }
  }

  const handleClick = async (e) => {
	e.preventDefault();
	const petInfo = await {
		isMobile: false,
		toAddress: myAddress,
		tokenId: getRandomArbitrary(1018600, 1018699),
		desc: {
			name: petName.current.value,
			animalKind: animalKind.current.value,
			species: species.current.value,
			bornDate: bornDate.current.value,
			isVaccinated: isVaccinated.current.value,
		},
		img: imageURL,
	}
	console.log(petInfo);
	await MintQR(petInfo);
}
  return (
    <>
      <QRContainer>
        <QRLeftBar>
          <MintContainer>
            <MintBox onSubmit={handleClick}>
              <MintInput placeholder="pet name" required ref={petName}></MintInput>
              <MintInput
                placeholder="animalKind"
                required
                ref={animalKind}
              ></MintInput>
              <MintInput
                placeholder="species"
                required
                ref={species}
              ></MintInput>
              <MintInput
                placeholder="bornDate(yyyy/mm/dd)"
                required
                ref={bornDate}
              ></MintInput>
              <MintCheck>
                isVaccinated
                <MintCheckInput
                  type="checkbox"
                  placeholder="isVaccinated"
                  required
                  ref={isVaccinated}
                  id="ch"
                ></MintCheckInput>
              </MintCheck>

              <MintInput
                placeholder="imageURL"
                required
                onChange={(e) => {
                  setImageURL(e.target.value);
                }}
              ></MintInput>
              <MintButton type="submit">Mint your pet</MintButton>
            </MintBox>
          </MintContainer>
        </QRLeftBar>
        <QRCodeContainer>
          <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
        </QRCodeContainer>
        <QRRigntBar>
          <Card
            className="text-center"
            style={{ color: "black", height: "50%", borderColor: "#C5B358" }}
          >
            <Card.Body style={{ opacity: 0.9, backgroundColor: "black" }}>
              {imageURL !== "" ? (
                <Card.Img src={imageURL} height={"300px"} />
              ) : null}
            </Card.Body>
          </Card>
        </QRRigntBar>
      </QRContainer>
    </>
  );
}
