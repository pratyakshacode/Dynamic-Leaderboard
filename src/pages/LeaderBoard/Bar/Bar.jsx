import React from "react";

const Bar = ({ rank, name, score, solved, attendence }) => {
  // console.log(attendence, "attendence");
  return (
    <>
      <div className="leaderboard-bar">
        <div id="leaderboard-bar-rank" className="leaderboard-bar-data">
          {rank + 1}
        </div>
        <div id="leaderboard-bar-name" className="leaderboard-bar-data">
          {name.toString().length > 20
            ? name.toString().substring(0, 20) + "..."
            : name}
        </div>
        <div id="leaderboard-bar-score" className="leaderboard-bar-data">
          {score}
        </div>
        <div id="leaderboard-bar-profile" className="leaderboard-bar-data">
          {solved}{" "}
          {/* <span id="attendence-indication">
            {attendence === "P" ? "🟢" : "🔴"}
          </span> */}
        </div>
        <div id="leaderboard-bar-attendence" className="leaderboard-bar-data">
        {attendence === "P" ? "🟢" : "🔴"}
        </div>
      </div>
    </>
  );
};

export default Bar;
