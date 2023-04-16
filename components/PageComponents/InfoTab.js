// Import orange alliance, react, & website components
import { getRecentEvents } from "@/lib/orangealliance";
import { useState, useEffect } from "react";
import AdminSettings from "./AdminSettings";

function ShowTabButton({ showTab, onTabButtonClick }) {
  if (showTab === "RecentEvents") {
    return (
      <section>
        <button
          value="Admin"
          onClick={onTabButtonClick}
          className="bg-blue-900 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-50 rounded h-6 w-36 text-white"
        >
          Admin
        </button>
      </section>
    );
  } else if (showTab === "Admin") {
    return (
      <section>
        <button
          value="RecentEvents"
          onClick={onTabButtonClick}
          className="bg-blue-900 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-50 rounded h-6 w-36 text-white"
        >
          Recent Events
        </button>
      </section>
    );
  }
}

export default function InfoTab() {
  // Define event & sidebar display state
  const [events, setEvents] = useState([]);
  const [showTab, setShowTab] = useState("RecentEvents");
  // Retrieve events on page load
  useEffect(() => {
    async function fetchData() {
      const recentEvents = await getRecentEvents();
      setEvents(recentEvents);
    }

    fetchData();
  }, []);
  // Change sidebar display state
  function handleTabButtonClick(event) {
    setShowTab(event.target.value);
  }

  if (showTab == "RecentEvents") {
    return (
      <article>
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Extra Info</h2>
          <ShowTabButton
            showTab={showTab}
            onTabButtonClick={handleTabButtonClick}
          />
        </div>
        <hr className="border-solid border-2 mb-2 mt-1" />
        <h3 className="w-56">Recent Events</h3>
        <hr className="border-solid border-2 mb-2 mt-1 w-56" />
        {events.map((event) => (
          <div
            className="flex flex-col md:flex-row lg:flex-col xl:flex-row"
            key={event.eventKey}
          >
            <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 md:mr-2 lg:mr-0 xl:mr-2">
              {event.eventName}
            </p>
            <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
              {event.startDate.slice(0, 10)}
            </p>
          </div>
        ))}
      </article>
    );
  }
  if (showTab == "Admin") {
    return (
      <article>
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Extra Info</h2>
          <ShowTabButton
            showTab={showTab}
            onTabButtonClick={handleTabButtonClick}
          />
        </div>
        <hr className="border-solid border-2 mb-2 mt-1" />
        <AdminSettings />
      </article>
    );
  }
}
