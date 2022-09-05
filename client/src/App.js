import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import MintPage from "./pages/MintPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [myAddress, setMyAddress] = useState("0x00000000000000000000");
  const [myBalance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "Modal",
    onConfirm: () => {},
  });

  return (
    <>
      {/* Route */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                myAddress={myAddress}
                myBalance={myBalance}
                user={user}
                setMyAddress={setMyAddress}
                setBalance={setBalance}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/mypage/:walletAddress"
            element={
              user ? (
                <MyPage
                  myAddress={myAddress}
                  myBalance={myBalance}
                  user={user}
                  showModal={showModal}
                  modalProps={modalProps}
                  setShowModal={setShowModal}
                  setModalProps={setModalProps}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/mint"
            element={
              user ? (
                <MintPage
                  myAddress={myAddress}
                  myBalance={myBalance}
                  user={user}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/register"
            element={<RegisterPage myAddress={myAddress} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
