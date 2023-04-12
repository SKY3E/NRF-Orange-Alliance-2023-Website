import { getRecentEvents } from "@/lib/orangealliance";
import { useState, useEffect } from 'react';

export default function ProfileTab() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const recentEvents = await getRecentEvents();
      setEvents(recentEvents);
    }

    fetchData();
  }, []);

  return (
    <section>
      <h1>Profile Tab</h1>
      <ul>
        {events.map((event) => (
          <li key={event.eventKey}>{event.eventName} / {event.startDate}</li>
        ))}
      </ul>
    </section>
  );
}