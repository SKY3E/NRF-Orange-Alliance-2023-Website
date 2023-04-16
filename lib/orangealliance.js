// Import Orange Alliance package
import { API } from "@the-orange-alliance/api";

const toa = new API(process.env.NEXT_PUBLIC_API_TOKEN, "My App");

export async function getRecentEvents() {
  const now = new Date();
  const start = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString();
  const end = new Date(now.getTime() + (6 * 24 * 60 * 60 * 1000)).toISOString();

  const events = await toa.getEvents();
  const filteredEvents = events.filter((event) => {
      return event.startDate >= start && event.startDate <= end
    }
  );
  
  return filteredEvents;
}

export async function getRegions() {
  const regions = await toa.getRegions();
  return regions;
}

export async function getEvents(region, month) {
  const events = await toa.getEvents("2022-23-pp");
  if (region != "Regions" && month != "Months") {
    const filteredEventsByRegion = events.filter(event => event.regionKey == region);
    const filteredEventsByRegionAndMonth = filteredEventsByRegion.filter(event => event.weekKey == month);
    return filteredEventsByRegionAndMonth;
  } else if (region == "Regions" && month != "Months") {
    const filteredEventsByMonth = events.filter(event => event.weekKey == month);
    return filteredEventsByMonth;
  } else if (region != "Regions" && month == "Months") {
    const filteredEventsByRegion = events.filter(event => event.regionKey == region);
    return filteredEventsByRegion;
  } else {
    return [];
  }
}

export async function getEventWithKey(eventKey) {
  const event = await toa.getEvent(eventKey);
  return event;
}

export async function getTeamsWithEvent(event) {
  const eventKey = event.eventKey;
  const eventTeams = await toa.getEventTeams(eventKey);
  return eventTeams;
}

export async function getRankingsWithEvent(event) {
  const eventKey = event.eventKey;
  const eventRankings = await toa.getEventRankings(eventKey);
  return eventRankings;
}

export async function getMatchesWithEvent(event) {
  const eventKey = event.eventKey;
  const eventMatches = await toa.getEventMatches(eventKey);
  return eventMatches;
}