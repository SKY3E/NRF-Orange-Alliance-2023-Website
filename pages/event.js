import { getRecentEvents } from "@/lib/orangealliance";
import { useState, useEffect } from 'react';

export default function event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const recentEvents = await getRecentEvents();
      setEvents(recentEvents);
    }

    fetchData();
  }, []);

  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventKey}>{event.eventName} / {event.startDate}</li>
        ))}
      </ul>
    </section>
  );
}