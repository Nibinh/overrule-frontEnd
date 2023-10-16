import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
