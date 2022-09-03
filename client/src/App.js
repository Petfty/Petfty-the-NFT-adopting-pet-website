import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import MintPage from "./pages/MintPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [myAddress, setMyAddress] = useState("0x00000000000000000000");
  const [myBalance, setBalance] = useState(0);
  const [user, setUser] = useState(null);

  return (
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
          element={user ? <MyPage /> : <Navigate to="/" />}
        />
        <Route
          path="/mint"
          element={user ? <MintPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={<RegisterPage myAddress={myAddress} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
