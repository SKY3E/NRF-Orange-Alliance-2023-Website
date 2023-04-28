// Import Orange Alliance package & set api
import { API } from "@the-orange-alliance/api";
const toa = new API(process.env.NEXT_PUBLIC_API_TOKEN, "My App");

export async function getRecentEvents() {
  const now = new Date();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const end = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString();

  const events = await toa.getEvents();
  let filteredEvents = [];
  filteredEvents = events.filter((event) => {
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
      const alliance = participant.matchParticipantKey.charAt(
        participant.matchParticipantKey.length - 2
      );
      const score = alliance === "r" ? redScore : blueScore;
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

    matchTeams[match.matchName + "Red"] = matchParticipantRed.join(" + ");
    matchTeams[match.matchName + "Blue"] = matchParticipantBlue.join(" + ");
  }

  return matchTeams;
}

export function getParticipantsWithMatch(match) {
  const matchTeams = {};

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

  matchTeams[match.matchName + "Red"] = matchParticipantRed.join(" + ");
  matchTeams[match.matchName + "Blue"] = matchParticipantBlue.join(" + ");

  return matchTeams;
}

export async function getRecentBestTeams() {
  const today = new Date();
  const start = new Date(
    today.getTime() - 100 * 24 * 60 * 60 * 1000
  ).toISOString();

  const events = await toa.getEvents();
  const filteredEvents = events.filter((event) => {
    return event.startDate >= start && event.startDate <= today.toISOString();
  });

  const orderedEvents = filteredEvents.sort((a, b) => {
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);
    return aDate - bDate;
  });

  if (orderedEvents.length >= 1) {
    const lastEvent = orderedEvents[orderedEvents.length - 1];
    const eventKey = lastEvent.eventKey;

    const rankings = await toa.getEventRankings(eventKey);
    const top5Rankings = rankings.slice(0, 5);
    return top5Rankings;
  } else {
    return [];
  }
}

export async function getTeamsWithKey(teamNumber) {
  const allTeams = await toa.getTeams();
  const teamsWithKey = allTeams.filter((team) =>
    team.teamKey.includes(teamNumber.toString())
  );
  return teamsWithKey;
}

export async function getTeamWithKey(teamNumber) {
  const team = await toa.getTeam(teamNumber);
  return team;
}

export async function getEventsWithTeam(teamNumber) {
  const teamEvents = await toa.getTeamEvents(teamNumber, "2223");

  const eventsWithData = [];
  for (const event of teamEvents) {
    // Retrieve the event data with the keys you need
    const eventData = await getEventData(event.eventKey);
    if (eventData) {
      // If the event data was found, add it to the list of events with data
      eventsWithData.push(eventData);
    }
  }

  return eventsWithData;
}

async function getEventData(eventKey) {
  const event = await toa.getEvent(eventKey);
  if (event) {
    return event;
  }
  return null; // If event data was not found
}

export async function getMatchWithKey(matchKey) {
  const matchData = await toa.getMatch(matchKey);
  return matchData
}
