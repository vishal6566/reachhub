import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SinglePlayerPage from "./pages/SinglePlayerPage";
function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/players/:username" element={<SinglePlayerPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
