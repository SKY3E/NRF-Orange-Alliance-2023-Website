import TeamView from "../components/ApiViews/TeamView";
import EventView from "../components/ApiViews/EventView";

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
    if (event.target.value == "Event") {
      setShowView(event.target.value);
    }
  }

  if (showView == "Select Api View") {
    return (
      <main>
        Api Viewer
        <select onChange={(event) => SelectView(event)}>
          <option value="Select Api View">Select Api View</option>
          <option value="Team">Team</option>
          <option value="Event">Event</option>
        </select>
      </main>
    );
  } else if (showView == "Team") {
    return (
      <main>
        Api Viewer
        <select onChange={(event) => SelectView(event)}>
          <option value="Select Api View">Select Api View</option>
          <option value="Team">Team</option>
          <option value="Event">Event</option>
        </select>
        <TeamView />
      </main>
    );
  } else if (showView == "Event") {
    return (
      <main>
        Api Viewer
        <select onChange={(event) => SelectView(event)}>
          <option value="Select Api View">Select Api View</option>
          <option value="Team">Team</option>
          <option value="Event">Event</option>
        </select>
        <EventView />
      </main>
    );
  }
}