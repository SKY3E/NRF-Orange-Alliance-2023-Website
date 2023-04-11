import TeamView from "../components/ApiViews/TeamView";
import SideBar from "../components/PageComponents/SideBar";

import React, { useState } from "react";

export default function apiView() {
  const [showView, setShowView] = useState("Select Api View");
  function SelectView(event) {
    console.log(event.target.value);
    if (event.target.value == "Select Api View") {
      setShowView(event.target.value);
    }
    if (event.target.value == "Team") {
      setShowView(event.target.value);
    }
  }

  if (showView == "Select Api View") {
    return (
      <main>
        <div className="ml-64 flex mx-2 space-x-2">
          <a href="/">Index Page</a>
          <h1 className="">Api Viewer</h1>
          <select onChange={(event) => SelectView(event)}>
            <option value="Select Api View">Select Api View</option>
            <option value="Team">Team</option>
          </select>
        </div>
      </main>
    );
  } else if (showView == "Team") {
    return (
      <main>
        <a href="/">Index Page</a>
        <h1>Api Viewer</h1>
        <select onChange={(event) => SelectView(event)}>
          <option value="Select Api View">Select Api View</option>
          <option value="Team">Team</option>
          <option value="Event">Event</option>
        </select>
        <TeamView />
      </main>
    );
  }
}