// Import next, orange alliance, & react components
import Link from "next/link";
import { getRecentEvents } from "../lib/orangealliance";
import { useState, useEffect } from "react";

export default function Home() {
  // Define event states
  const [events, setEvents] = useState([]);
  // Fetch event data
  useEffect(() => {
    async function fetchData() {
      const recentEvents = await getRecentEvents();
      setEvents(recentEvents);
    }

    fetchData();
  }, []);

  return (
    <section className="ml-4 mr-4 lg:ml-64 mt-20">
      <h1 className="text-5xl font-bold mb-2 mt-20 lg:mt-32 text-center">
        The Ocean Scout
      </h1>
      <p className="text-center">
        The Ocean Scout is the ultimate scouting tool for <em>FIRST</em> Tech
        Challenge
      </p>
      <p className="mb-6 text-center">
        Allowing for efficient collection, analysis, and reviewal of data to
        gain a competitive edge.
      </p>
      <div className="flex flex-col md:flex-row">
        <article className="rounded bg-white bg-opacity-50 p-2 md:mr-4 mb-2 text-black md:w-1/2 border-2 border-gray-300">
          <h2 className="text-xl">Start Scouting</h2>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col xl:w-1/2 mr-1 items-center">
              <Link href={"/event"} legacyBehavior>
                <button className="bg-white bg-opacity-50 hover:bg-blue-900 hover:bg-opacity-30 rounded h-10 w-56 text-black border-2 border-gray-300 flex items-center justify-center mt-2">
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                    />
                  </svg>
                  <div>Event</div>
                </button>
              </Link>
              <h3 className="text-lg text-center mt-1">Explore Events</h3>
              <p>Navigate through events :</p>
              <hr className="w-56 border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
              <ul className="pl-7 list-inside list-disc leading-4">
                <li>Event Details</li>
                <li>Participating Teams</li>
                <li>Match Results</li>
                <li>Rankings</li>
              </ul>
            </div>
            <div className="flex flex-col xl:w-1/2 ml-1 items-center">
              <Link href={"/team"} legacyBehavior>
                <button className="bg-white bg-opacity-50 hover:bg-blue-900 hover:bg-opacity-30 rounded h-10 w-56 text-black border-2 border-gray-300 flex items-center justify-center mt-2">
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                  <div>Team</div>
                </button>
              </Link>
              <h3 className="text-lg text-center mt-1">Explore Teams</h3>
              <p>Navigate through teams :</p>
              <hr className="w-56 border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
              <ul className="pl-7 list-inside list-disc leading-4">
                <li>Team Information</li>
                <li>Past Events</li>
                <li>Match Results</li>
                <li>Event Rankings</li>
                <li>Event Awards</li>
              </ul>
            </div>
          </div>
        </article>
        <article className="rounded bg-white bg-opacity-50 p-2 mb-2 text-black border-2 border-gray-300 md:w-1/2">
          <h2 className="text-xl">Recent Events</h2>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          {events.map((event) => (
            <div
              className="flex flex-col xl:flex-row"
              key={event.eventKey}
            >
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 xl:mr-2 border-2 border-gray-300">
                {event.eventName}
              </p>
            </div>
          ))}
        </article>
      </div>
      <div className="rounded bg-white bg-opacity-50 p-2 mb-2 text-black border-2 border-gray-300 flex items-center space-x-2">
        <svg
          className="h-6 w-6 text-blue-900 opacity-50"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          />
        </svg>
        <p>
          As of now, you{" "}
          <span className="underline italic">must be signed</span> and{" "}
          <span className="underline italic">also be authorized</span> by an
          administrator to access core features of{" "}
          <span className="underline italic">The Ocean Scout</span>.
        </p>
      </div>
    </section>
  );
}
