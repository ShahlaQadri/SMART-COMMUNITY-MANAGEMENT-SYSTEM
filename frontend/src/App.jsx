import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome</h1>} /> {/* Add this default route */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
