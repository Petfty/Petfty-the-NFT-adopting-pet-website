import { React, useState } from "react";
import styled from "styled-components";
import QRCode from "qrcode.react";
import axios from "axios";

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
  flex:3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QRRigntBar = styled.div`
  flex:3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.div`
  border: none;
	padding: 7px;
	border-radius: 5px;
	background-color: #803333;
	font-weight: 500;
	margin-right: 20px;
	cursor: pointer;
	color: white;
`;

const DEFAULT_QR_CODE = "DEFAULT";

export default function QR(props) {
  const { setMyAddress } = props;
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  const LoginQR = (callback) => {
    let request_key = null;
    try {
      axios.get("/auth/connectURL", {isMobile: false}).then((res) => {
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
                callback(res.data.result.klaytn_address);
                clearInterval(timeId);
                setQrvalue("DEFAULT");
                setMyAddress(res.data.result.klaytn_address);
              }
            });
        }, 1000);
      })
    } catch (err) {
      console.log(err.response.data)
    }
  };

  return (
    <QRContainer>
      <QRLeftBar>

      </QRLeftBar>
      <QRCodeContainer>
        <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
      </QRCodeContainer>
      <QRRigntBar>
        <LoginButton onClick={()=> {LoginQR((result)=> {alert(JSON.stringify(result));})}}>
          Login
        </LoginButton>
      </QRRigntBar>
    </QRContainer>
  );
}
