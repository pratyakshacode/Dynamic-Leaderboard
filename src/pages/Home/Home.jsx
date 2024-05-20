import React from "react";
import "./Home.css";
import beingzero from "../../assets/beingzerow.gif";
import { motion, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = ({ setSheetURL, sheetURL }) => {
  const x = useMotionValue(0);
  const navigate = useNavigate();

  const handleSetURL = () => {
    localStorage.setItem("sheetURL", sheetURL);
    navigate("/leaderboard");
  };

  return (
    <section id="home">
      <div id="home-content">
        <motion.div
          className="home-content-box"
          id="home-content-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome To Mentorpick LeaderBoard</h1>
          <h3 style={{ textAlign: "center" }}>
            Coding leaderboard lets you check your performance on real-time
          </h3>

          <div id="googlesheet-url-box">
            <input
              type="text"
              id="googlesheet-url-input"
              placeholder="Paste Your Googlesheet Link Here"
              onChange={(e) => setSheetURL(e.target.value)}
            />
            <button onClick={handleSetURL}>Set URL</button>
          </div>
        </motion.div>
        <div className="home-content-box" id="home-content-right">
          <motion.div
            id="home-intro-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <img src={beingzero} alt="Being Zero" id="being-zero-logo" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
