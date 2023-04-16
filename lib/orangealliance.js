// Import Orange Alliance package
import { API } from "@the-orange-alliance/api";

const toa = new API(process.env.NEXT_PUBLIC_API_TOKEN, "My App");

export async function getRecentEvents() {
  const now = new Date();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const end = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString();

  const events = await toa.getEvents();
  const filteredEvents = events.filter((event) => {
    return event.startDate >= start && event.startDate <= end;
  });

  return filteredEvents;
}

export async function getRegions() {
  const regions = await toa.getRegions();
  return regions;
}

export async function getEvents(region, month) {
  const events = await toa.getEvents("2022-23-pp");
  if (region != "Regions" && month != "Months") {
    const filteredEventsByRegion = events.filter(
      (event) => event.regionKey == region
    );
    const filteredEventsByRegionAndMonth = filteredEventsByRegion.filter(
      (event) => event.weekKey == month
    );
    return filteredEventsByRegionAndMonth;
  } else if (region == "Regions" && month != "Months") {
    const filteredEventsByMonth = events.filter(
      (event) => event.weekKey == month
    );
    return filteredEventsByMonth;
  } else if (region != "Regions" && month == "Months") {
    const filteredEventsByRegion = events.filter(
      (event) => event.regionKey == region
    );
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

export function getPointsWithMatches(matches) {
  const teams = {};

  for (const match of matches) {
    const redScore = match.redScore;
    const blueScore = match.blueScore;
    const matchParticipants = match.participants;

    for (const participant of matchParticipants) {
      const team = participant.teamKey;
      const alliance = participant.matchParticipantKey.charAt(participant.matchParticipantKey.length - 2);
      const score = alliance === 'r' ? redScore : blueScore;
      teams[team] = (teams[team] || 0) + score;
    }
  }

  return teams;
}

export function getParticipantsWithMatches(matches) {
  const matchTeams = {};

  for (const match of matches) {
    const matchParticipants = match.participants;
    const matchParticipantRed = [];
    const matchParticipantBlue = [];
    let participantNumber = 0;

    for (const participant of matchParticipants) {
      participantNumber++;
      if (matchParticipants.length == 4) {
        if (participantNumber <= 2) {
          matchParticipantRed.push(participant.teamKey);
        }
        if (participantNumber > 2) {
          matchParticipantBlue.push(participant.teamKey);
        }
      }
      if (matchParticipants.length == 6) {
        if (participantNumber <= 3) {
          matchParticipantRed.push(participant.teamKey);
        }
        if (participantNumber > 3) {
          matchParticipantBlue.push(participant.teamKey);
        }
      }
    }

    matchTeams[match.matchName + "Red"] = matchParticipantRed.join(' + ');
    matchTeams[match.matchName + "Blue"] = matchParticipantBlue.join(' + ');
  }

  return matchTeams;
}

export async function getAwardsWithEvent(event) {
  const eventKey = event.eventKey;
  const eventAwards = await toa.getEventAwards(eventKey);
  console.log("Event Awards:", eventAwards);
  return eventAwards;
}
