import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import MintPage from "./pages/MintPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/mypage/:walletAddress"
          element={user ? <MyPage /> : <Navigate to="/" />}
        />
        <Route
          path="/mint"
          element={user ? <MintPage /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
