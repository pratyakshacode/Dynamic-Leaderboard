import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="leaderboard-navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/guide">Guide</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
