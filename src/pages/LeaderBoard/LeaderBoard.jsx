import React, { useEffect, useState } from "react";
import "./LeaderBoard.css";
import { motion, Reorder } from "framer-motion";
import firstBadge from "../../assets/first.png";
import secondBadge from "../../assets/second.png";
import thirdBadge from "../../assets/third.png";
import Bar from "./Bar/Bar";
import Loader from "../../components/Loader/Loader";
const LeaderBoard = ({ sheetURL }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [attend, setAttend] = useState("All");
  const [studentData, setStudentData] = useState({});
  const [solvedCount, setSolvedCount] = useState(0);
  const [solveAtLeast, setSolveAtLeast] = useState(true);
  const [venue, setVenue] = useState("");
  const [venueFilteredData, setVenueFilterData] = useState({});
  const [venueLoading, setVenueLoading] = useState(false);
  const [venueOptions, setVenueOptions] = useState([]);

  const setAttendence = () => {
    const localStorageAttendenceData = {};

    if (localStorage.getItem("attendence") !== null) {
      setStudentData(JSON.parse(localStorage.getItem("attendence")));
      return;
    }

    data.forEach((item) => {
      localStorageAttendenceData[item.username] = item.attendence;
    });

    localStorage.setItem(
      "attendence",
      JSON.stringify(localStorageAttendenceData)
    );
    setStudentData(localStorageAttendenceData);
  };

  const clearAttendence = () => {
    localStorage.removeItem("attendence");
    localStorage.removeItem("venue");
    setStudentData({});
    setVenueFilterData({});
  };

  const setVenueData = () => {
    const localStorageVenueData = {};

    const set = new Set();
    data.forEach((item) => {
      if (item.venue !== "") set.add(item.venue.toUpperCase());
    });

    setVenueOptions(Array.from(set));

    if (localStorage.getItem("venue") !== null) {
      setVenueFilterData(JSON.parse(localStorage.getItem("venue")));
      return;
    }

    data.forEach((item) => {
      localStorageVenueData[item.username] = item.venue;
    });

    console.log(set);

    localStorage.setItem("venue", JSON.stringify(localStorageVenueData));
    setVenueFilterData(localStorageVenueData);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const url = sheetURL;
      const response = await fetch(sheetURL);

      const response_data = await response.json();

      let tempData = response_data.data.slice(1);

      tempData.sort((a, b) => {
        return b.score - a.score;
      });

      if (attend === "P" || attend === "A") {
        tempData = tempData.filter((item) => {
          return studentData[item.username] === attend;
        });
      }

      tempData = tempData.filter((item) => {
        return solveAtLeast
          ? item.solved >= solvedCount
          : item.solved <= solvedCount;
      });

      if (venue.length > 0) {
        setVenueLoading(true);
        tempData = tempData.filter((item) => {
          return venueFilteredData[item.username]
            .toLowerCase()
            .includes(venue.toLowerCase());
        });
        setVenueLoading(false);
      }

      setLoading(false);
      setData(tempData);

      const localStorageAttendenceData = localStorage.getItem("attendence");
      if (localStorage.getItem("attendence") !== null) {
        setStudentData(JSON.parse(localStorageAttendenceData));
      }
    };

    if (sheetURL) getData();

    const intervalId = setInterval(getData, 3000);
    return () => clearInterval(intervalId);
  }, [attend, solvedCount, sheetURL, venue, solveAtLeast]);

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const resultBarVariant = {
    visible: {
      scale: 1,
      transition: { duration: 0.5 },
    },
    hidden: {
      scale: 0,
    },
  };

  return (
    <>
      {showResult && (
        <motion.div
          id="winner-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            id="first-winner"
            className="winner-bar"
            initial="hidden"
            animate="visible"
            variants={resultBarVariant}
          >
            <div id="first-badge">
              <img src={firstBadge} alt="" />
            </div>
            <div id="first-winner-name" className="winner-name">
              <span>{JSON.stringify(data[0].name)}</span>
            </div>
          </motion.div>
          <motion.div
            id="second-winner"
            className="winner-bar"
            initial="hidden"
            animate="visible"
            variants={resultBarVariant}
          >
            <div id="second-badge">
              <img src={secondBadge} alt="" />
            </div>
            <div id="second-winner-name" className="winner-name">
              <span>{JSON.stringify(data[1].name)}</span>
            </div>
          </motion.div>
          <motion.div
            id="third-winner"
            className="winner-bar"
            initial="hidden"
            animate="visible"
            variants={resultBarVariant}
          >
            <div id="third-badge">
              <img src={thirdBadge} alt="" />
            </div>
            <div id="third-winner-name" className="winner-name">
              <span>{JSON.stringify(data[2].name)}</span>
            </div>
          </motion.div>

          <div id="close-winner-cover" onClick={() => setShowResult(false)}>
            <button>X</button>
          </div>
        </motion.div>
      )}
      <motion.section id="leaderboard-section">
        <div id="leaderboard-header">
          <h2>
            <span id="mentorpick">Mentorpick</span> Contest Leaderboard
          </h2>
        </div>
        {sheetURL && (
          <>
            <div id="show-result-container">
              <button
                onClick={() => {
                  setShowResult(true);
                }}
              >
                Show Result
              </button>
              <button
                onClick={setAttendence}
                disabled={Object.keys(studentData).length ? true : false}
                className={
                  Object.keys(studentData).length
                    ? "disabled-button"
                    : "set-attendence-button"
                }
              >
                Attendence
              </button>
              <button
                onClick={setVenueData}
                className={
                  Object.keys(venueFilteredData).length
                    ? "disabled-button"
                    : "set-venue-button"
                }
                disabled={Object.keys(venueFilteredData).length ? true : false}
              >
                Set Venue
              </button>
              <button
                onClick={clearAttendence}
                className="clear-attendence-button"
                disabled={Object.keys(studentData).length ? false : true}
              >
                Clear
              </button>
            </div>

            <div id="search-venue-container">
              <select
                name="venue-select"
                id="venue-select"
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
              >
                <option value="">Select Venue</option>
                {venueOptions.map((venue, index) => {
                  return (
                    <option key={index} value={venue}>
                      {venue}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
        )}

        <div id="leaderboard-table-container">
          <div id="leaderboard-cover" />
          {sheetURL && (
            <div id="leaderboard-table-header">
              <div
                id="leaderboard-header-rank"
                className="leaderboard-table-header-data"
              >
                Rank
              </div>
              <div
                id="leaderboard-header-name"
                className="leaderboard-table-header-data"
              >
                Name
              </div>
              <div
                id="leaderboard-header-score"
                className="leaderboard-table-header-data"
              >
                <select
                  name="attendence"
                  id="select-attendence"
                  className="header-select"
                  onChange={(e) => {
                    setAttend(e.target.value);
                  }}
                >
                  <option value="All">Score</option>
                  <option value="P">{"> 100"}</option>
                  <option value="A">{"< 100"}</option>
                </select>
              </div>
              <div
                id="leaderboard-header-solved"
                className="leaderboard-table-header-data"
              >
                <select
                  name="solved-count-select"
                  id="solved-count-select"
                  onChange={(e) => {
                    setSolveAtLeast(e.target.value === "atleast");
                  }}
                >
                  <option value="atleast">At Least</option>
                  <option value="atmost">At Most</option>
                </select>
                <input
                  type="number"
                  className="solved-count-input"
                  min={0}
                  onChange={(e) => setSolvedCount(e.target.value)}
                  value={solvedCount}
                />
              </div>
              <div
                id="leaderboard-header-attendence"
                className="leaderboard-table-header-data"
              >
                <select
                  name="attendence"
                  id="select-attendence"
                  className="header-select"
                  onChange={(e) => {
                    setAttend(e.target.value);
                  }}
                >
                  <option value="All">Attendance</option>
                  <option value="P">Present</option>
                  <option value="A">Absent</option>
                </select>
              </div>
            </div>
          )}

          {data.length == 0 && sheetURL ? (
            <Loader />
          ) : sheetURL ? (
            <Reorder.Group
              axis="y"
              values={data}
              onReorder={setData}
              animate="visible"
            >
              {data.map((item, index) => {
                return (
                  <Reorder.Item
                    key={item.username}
                    value={item.username}
                    layoutScroll
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={variants}
                    initial={{ opacity: 0, x: -100 }}
                  >
                    <Bar
                      rank={index}
                      name={item.name}
                      score={item.score}
                      solved={item.solved}
                      attendence={studentData[item.username]}
                    />
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          ) : (
            "Paste the Google Sheet URL to see the Leaderboard"
          )}
        </div>
      </motion.section>
    </>
  );
};

export default LeaderBoard;
