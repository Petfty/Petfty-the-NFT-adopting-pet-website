import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import styled from "styled-components";
import {
  Alert,
  Container,
  Card,
  Nav,
  Form,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

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

const TokneListContainer = styled.div`
  height: 100%;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const TokenUpdateButton = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #898a8d;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const DEFAULT_QR_CODE = "DEFAULT";

export default function Tokens(props) {
  const {
    isMarket,
    Address,
    showModal,
    modalProps,
    setShowModal,
    setModalProps,
  } = props;
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [nfts, setNfts] = useState([]);
  const [nftImages, setNftImages] = useState([]);
  const navigate = useNavigate();
  const rows = nfts.slice(nfts.length / 2);

  const onClickCard = (id) => {
    if (isMarket === false) {
      setModalProps({
        title: "NFT를 마켓에 올리겠어요?",
        isConfirm: true,
        onConfirm: () => {
          onClickMyCard(id);
        },
      });
      setShowModal(true);
    }
    if (isMarket === true) {
      setModalProps({
        title: "NFT를 구매하시겠어요?",
        isConfirm: true,
        onConfirm: () => {
          onClickMarkeCard(id);
        },
      });
      setShowModal(true);
    }
  };

  const onClickMyCard = (tokenId) => {
    let request_key = null;
    const cardInfo = {
      isMobile: true,
      fromAddress: Address,
      tokenId: tokenId,
    };
    try {
      axios.put("/tokens/saleTokenURL", cardInfo).then((res) => {
        setQrvalue(res.data.url + res.data.request_key);
        console.log(qrvalue);
        setModalProps({
          title: "KLIP앱을 열어 QR을 인증하세요",
          isConfirm: false,
          onConfirm: () => {
            return (
              <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
            );
          },
        });
        setShowModal(true);
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
                alert("Token is On Market");
                setShowModal(false);
                navigate("/mypage/" + Address);
              }
            });
        }, 1000);
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onClickMarkeCard = (tokenId) => {
    console.log("aa");
  };

  const getNfts = async () => {
    const response = await axios.put("/tokens/info/" + Address, {
      walletAddress: Address,
    });
    if (
      response.data &&
      Object.keys(response.data).length === 0 &&
      Object.getPrototypeOf(response.data) === Object.prototype
    ) {
      // console.log("empty")
      setNfts([]);
      setNftImages([]);
    } else {
      setNfts(response.data);
      getInfo(response.data);
    }
  };

  const getImage = async (uri) => {
    const response = await axios.get(uri);
    await console.log(typeof response);
    return await response.data.image;
  };

  const getInfo = (uri) => {
    for (let i = 0; i < uri.length; i++) {
      getImage(uri[i].uri).then((result) => {
        setNftImages((current) => [...current, result]);
        console.log(nftImages);
      });
    }
  };

  return (
    <TokenContainer>
      <br />
      <TokenUpdateButton onClick={getNfts}>Update Tokens</TokenUpdateButton>
      <TokneListContainer>
        {rows.map((o, rowIndex) => (
          <Row key={rowIndex}>
            <Col style={{ marginRight: 0, paddingRight: 0 }}>
              <Card
                onClick={() => {
                  onClickCard(nfts[rowIndex * 2].id);
                }}
              >
                <Card.Img
                  src={nftImages[rowIndex * 2]}
                  style={{ height: "250px" }}
                />
              </Card>
              [{nfts[rowIndex * 2].id}]NFT
            </Col>
            <Col style={{ marginRight: 0, paddingRight: 0 }}>
              {nfts.length > rowIndex * 2 + 1 ? (
                <Card
                  onClick={() => {
                    onClickCard(nfts[rowIndex * 2 + 1].id);
                  }}
                >
                  <Card.Img
                    src={nftImages[rowIndex * 2 + 1]}
                    style={{ height: "250px" }}
                  />
                </Card>
              ) : null}
              {nfts.length > rowIndex * 2 + 1 ? (
                <>[{nfts[rowIndex * 2 + 1].id}]NFT</>
              ) : null}
            </Col>
          </Row>
        ))}
      </TokneListContainer>
    </TokenContainer>
  );
}
