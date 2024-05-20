import React, { useState } from "react";
import "./Guide.css";
import { Prism as SyntaxHighLigher } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
const Guide = () => {
  const [copied, setCopied] = useState(false);

  const code = `function doGet(req) {

    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName('random');
    const values = sheet.getDataRange().getValues();
  
    let output = []
  
    for(let i=0; i<values.length; i++) {
      let row = {}
      row['name'] = values[i][0];
      row['username'] = values[i][1];
      row['college'] = values[i][2]
      row['solved'] = values[i][3];
      row['score'] = values[i][4];
      row['attendence'] = values[i][5];
      output.push(row);
    }
  
    return ContentService.createTextOutput(JSON.stringify({data: output}));
  }  
  `;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => setCopied(true))
      .catch((err) => {
        alert("Failed to copy text: ", err);
        // Handle error if copying fails
      });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <>
      <section id="guide">
        <h1 id="guide-major-heading">Guide</h1>
        <h2>How to Use Leaderboard</h2>
        <div id="guide-content">
          <h1>Basic Flow of Work</h1>
          <div id="guide-content-box" className="guide-content-slab">
            <p>
              1. Go to the Home page and paste your Google Sheet URL in the
              input box.
            </p>
            <p>
              2. Click on the <span className="bold">"Set URL"</span> button to
              set the URL and navigate to the Leaderboard page.
            </p>
            <p>3. You will see the leaderboard with your provided data.</p>
            <p>
              4. Click on the <span className="bold">"Guide"</span> link in the
              Navbar to see this guide again.
            </p>
          </div>

          <h1>Google Sheet SetUp</h1>
          <div id="guide-content-box" className="guide-content-slab">
            <p>
              1. The Google Sheet should have the following columns in the first
              row:
            </p>
            <ul>
              <li>Name</li>
              <li>UserName</li>
              <li>College</li>
              <li>Solved</li>
              <li>Score</li>
              <li>Attendance</li>
            </ul>
            <p>
              2. The "<span className="bold">Name</span>" column will have the
              names of the participants and
            </p>
            <p>
              the "<span className="bold">UserName</span>" column will have the
              usernames of the participants same as in mentorpick.
            </p>
            <p>
              3. The "<span className="bold">Solved</span>" column should have
              numerical values only.
            </p>
            <p>
              3. The "<span className="bold">Score</span>" column should have
              numerical values only.
            </p>
            <p>
              4. The "<span className="bold">Attendance</span>" column should
              have values as P or A
            </p>

            <h3 id="sheet-setup-guide-heading">Google Sheet Setup</h3>
            <p>
              1. Go to Google Sheets and create a new sheet with the required
              columns.
            </p>
            <p>
              2. Go to "<span className="bold">Extension</span>" section and
              click on "Apps Script" to open
            </p>
            <p>the Google Apps Script Editor.</p>
            <p>
              3. Copy the code from the "
              <span className="bold">Below Given</span>" section by clicking on
              the button and paste it in the Google Apps Script Editor.
            </p>

            <div id="copy-code-button-container">
              <button onClick={copyToClipboard}>
                {copied ? "Copied" : "Copy Code"}
              </button>
            </div>
            <SyntaxHighLigher language="javascript" style={nightOwl}>
              {code}
            </SyntaxHighLigher>
            <p>
              4. Save the script and name it as "
              <span className="bold">LeaderBoard</span>" and click on the "
              <span className="bold">Deploy</span>" button.
            </p>
            <p>
              5. Click on "<span className="bold">New Deployment</span>" and
              select "<span className="bold">Web App</span>" as the type of
              deployment from <span className="bold">select type</span> section.
              Do not forget to choose option "
              <span className="bold">Anyone</span>" in the "
              <span className="bold">Who has access to the app:</span>" section.
            </p>
            <p>
              6. Click on "<span className="bold">Update</span>" and copy the "
              <span className="bold">Current Web App URL</span>" and paste it in
              the input box in the Home page.
            </p>
            <p className="underline">Will be look like this :</p>
            <span className="bold">
              "https://script.google.com/macros/s/uqH9BotJNLAsVYk-7f_qUfR3nDhfvL/exec"
            </span>
          </div>

          <h1>Leaderboard Page</h1>
          <div className="guide-content-slab">
            <p>
              1. The leaderboard page will have the data from the Google Sheet
              in a tabular format.
            </p>
            <p>
              2. The data will be sorted in descending order of the "
              <span className="bold">Score</span>" column.
            </p>
            <p>
              3. To get the result, you have to press the "
              <span className="bold">Show Result</span>" button. Will show you
              the name of the winners with positions.
            </p>

            <h3 className="heading-space">Attendance</h3>
            <p>
              - To setup the attendance, you have to provide the attendance of
              the participants in the Google Sheet. Initially, fill the
              attendance column with "P" or "A" for present and absent
              respectively.
            </p>
            <p>
              1. The attendance will be shown in the leaderboard as 🟢 or 🔴.
            </p>
            <p>
              2. The green badge 🟢 represents the participant is present and
              the red badge 🔴 represents the participant is absent.
            </p>
            <p>
              3. Press the "<span className="bold">Attendance</span>" button to
              setup the attendance, then you can sort the data based on
              attendance.
            </p>
            <p>
              4. You can sort the data based on the attendance by clicking on
              the "<span className="bold">Attendance</span>" column.
            </p>
            <p>
              5. You can also sort the data based on solved count. Data will be
              sorted in <span className="bold">atmost</span> manner except for
              0.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Guide;
