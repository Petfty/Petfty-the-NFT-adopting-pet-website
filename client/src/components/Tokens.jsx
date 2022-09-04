import { React, useState, useEffect } from "react";
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

const TokensLeft = styled.div`
  flex: 5;
  height: 200px;

`;

const TokensRight = styled.div`
  flex: 5;
  height: 200px;
`;

export default function Tokens(props) {
  const {
    isMarket,
    Address,
    showModal,
    modalProps,
    setShowModal,
    setModalProps,
  } = props;
  const [nfts, setNfts] = useState([]);
  const [nftImages, setNftImages ] = useState([]);
  const rows = nfts.slice(nfts.length / 2);

  const onClickCard = (id) => {
    if (isMarket === true) {
      setModalProps({
        title: "NFT를 마켓에 올리겠어요?",
        onConfirm: () => {
          onClickMyCard(id);
        },
      });
      setShowModal(true);
    }
    if (isMarket === false) {
      setModalProps({
        title: "NFT를 구매하시겠어요?",
        onConfirm: () => {
          onClickMarkeCard(id);
        },
      });
      setShowModal(true);
    }
  };

  const onClickMyCard = (tokenId) => {
    console.log("dd")
  };

  const onClickMarkeCard = (tokenId) => {
    console.log("aa");
  };

  const getNfts = async () => {
    const response = await axios.put("/tokens/info/"+Address, {
      walletAddress: Address,
    });
    if (response.data 
    && Object.keys(response.data).length === 0
    && Object.getPrototypeOf(response.data) === Object.prototype) {
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
    await console.log(typeof(response));
    return (await (response.data.image));
  }

  const getInfo = (uri) => {
    for (let i = 0; i < uri.length; i++) {
      getImage(uri[i].uri).then((result) => {
        setNftImages(current => [...current, result]);
        console.log(nftImages);
      });
    }
  }

  return (
    <TokenContainer>
      <TokenUpdateButton onClick={getNfts}>
        Update Tokens
      </TokenUpdateButton>
      <TokneListContainer>
        {rows.map((o, rowIndex) => (
          <Row key={rowIndex} >
            <Col style={{ marginRight: 0, paddingRight: 0 }}>
              <Card
                onClick={() => {
                  onClickCard(nfts[rowIndex * 2].id);
                }}
              >
                <Card.Img src={nftImages[rowIndex * 2]} style={{ height: "250px" }} />
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
                  <Card.Img src={nftImages[rowIndex * 2 + 1] } style={{ height: "250px" }} />
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
