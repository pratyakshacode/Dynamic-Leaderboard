import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import Footer from "./components/Footer";
import Guide from "./pages/Guide/Guide";
const App = () => {
  const [sheetURL, setSheetURL] = useState(
    localStorage.getItem("sheetURL") || ""
  );

  useEffect(() => {
    localStorage.setItem("sheetURL", sheetURL);
  });

  return (
    <>
      <div id="body-container">
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home setSheetURL={setSheetURL} sheetURL={sheetURL} />}
            />
            <Route
              path="/leaderboard"
              element={<LeaderBoard sheetURL={sheetURL} />}
            />
            <Route path="/guide" element={<Guide />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
};

export default App;

// #6441A5 #2a0845
