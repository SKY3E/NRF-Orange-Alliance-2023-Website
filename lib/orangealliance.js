// Import Orange Alliance package
import { API } from "@the-orange-alliance/api";

const toa = new API(process.env.NEXT_PUBLIC_API_TOKEN, "My App");

export async function getRecentEvents() {
  const now = new Date();
  const start = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString();
  const end = new Date(now.getTime() + (6 * 24 * 60 * 60 * 1000)).toISOString();

  const events = await toa.getEvents();
  const filteredEvents = events.filter(
    (event) => {
      return event.startDate >= start && event.startDate <= end
    }
  );
  
  return filteredEvents
}