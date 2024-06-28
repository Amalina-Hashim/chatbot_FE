import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AdminPortal from "./components/AdminPortal";
import ChatBot from "./components/ChatBot";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup"];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </div>
  );
}

export default App;
