// Import next components, orange alliance functions, & react components
import { useRouter } from "next/router";
import {
  getEventWithKey,
  getTeamsWithEvent,
  getRankingsWithEvent,
  getMatchesWithEvent,
  getPointsWithMatches,
  getParticipantsWithMatches,
} from "@/lib/orangealliance";
import { useEffect, useState } from "react";

export default function EventPage() {
  // Define event details, rankings, teams and awards and set their display states
  const [eventRef, setEventRef] = useState(null);
  const [eventTeams, setEventTeams] = useState([]);
  const [showTeams, setShowTeams] = useState(false);
  const [eventRankings, setEventRankings] = useState([]);
  const [showRankings, setShowRankings] = useState(false);
  const [eventMatches, setEventMatches] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const [pointData, setPointData] = useState(null);
  const [matchParticipants, setMatchParticipants] = useState(null);
  // Define router components
  const router = useRouter();
  const { event } = router.query;

  // Retrieve event data
  useEffect(() => {
    if (event) {
      getEventWithKey(event)
        .then((eventData) => setEventRef(eventData))
        .catch((error) => console.log(error));
    }
  }, [event]);
  useEffect(() => {
    if (eventRef != null) {
      getTeamsWithEvent(eventRef)
        .then((teamData) => setEventTeams(teamData))
        .catch((error) => console.log(error));
    }
  }, [eventRef]);
  useEffect(() => {
    if (eventRef != null) {
      getRankingsWithEvent(eventRef)
        .then((eventRankings) => setEventRankings(eventRankings))
        .catch((error) => console.log(error));
    }
  }, [eventRef]);
  useEffect(() => {
    if (eventRef != null) {
      getMatchesWithEvent(eventRef)
        .then((matchData) => setEventMatches(matchData))
        .catch((error) => console.log(error));
    }
  }, [eventRef]);
  useEffect(() => {
    if (eventMatches != null) {
      try {
        const pointData = getPointsWithMatches(eventMatches);
        setPointData(pointData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [eventMatches]);
  useEffect(() => {
    if (eventMatches != null) {
      try {
        const matchParticipants = getParticipantsWithMatches(eventMatches);
        setMatchParticipants(matchParticipants);
      } catch (error) {
        console.log(error);
      }
    }
  }, [eventMatches]);
  // Define functions to change display states
  function changeTeamView() {
    setShowTeams(!showTeams);
  }
  function changeMatchView() {
    setShowMatches(!showMatches);
  }
  function changeRankingView() {
    setShowRankings(!showRankings);
  }

  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Event</h1>
      <div className="lg:flex lg:justify-between"></div>
      <div className="flex flex-col mr-4">
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white">
          <h2 className="text-xl">Details</h2>
          <hr className="border-solid border-2 mb-2 mt-1" />
          {eventRef ? (
            <div>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
                {eventRef.eventName}
              </p>
              <div className="grid grid-cols-2">
                <p className="bg-white rounded mb-2 mr-1 text-black text-center leading-8 px-1">
                  Start Date : {eventRef.startDate.substring(0, 10)}
                </p>
                <p className="bg-white rounded mb-2 ml-1 text-black text-center leading-8 px-1">
                  End Date : {eventRef.endDate.substring(0, 10)}
                </p>
                <p className="bg-white rounded mb-2 mr-1 text-black text-center leading-8 px-1">
                  City : {eventRef.city}
                </p>
                <p className="bg-white rounded mb-2 ml-1 text-black text-center leading-8 px-1">
                  Region : {eventRef.regionKey}
                </p>
                <p className="bg-white rounded mb-2 mr-1 text-black text-center leading-8 px-1">
                  Venue : {eventRef.venue}
                </p>
                <p className="bg-white rounded mb-2 ml-1 text-black text-center leading-8 px-1">
                  Event Type : {eventRef.eventTypeKey}
                </p>
              </div>
            </div>
          ) : (
            <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
              Loading...
            </p>
          )}
        </article>
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white">
          <div className="flex items-center">
            <h2 className="text-xl">Teams</h2>
            {showTeams ? (
              <button
                onClick={() => changeTeamView()}
                className="bg-green-600 hover:bg-opacity-50 rounded h-8 px-4 mr-2 ml-auto"
              >
                Hide
              </button>
            ) : (
              <button
                onClick={() => changeTeamView()}
                className="bg-green-600 hover:bg-opacity-50 rounded h-8 px-4 mr-2 ml-auto"
              >
                Show
              </button>
            )}
          </div>
          {showTeams ? (
            <div>
              <hr className="border-solid border-2 mb-1 mt-1" />
              <h3 className="text-md">
                Team Name / Team Number / Total Points (W/ Alliances)
              </h3>
              <hr className="border-solid border-2 mb-2 mt-1" />
              {eventTeams.length > 0 ? (
                eventTeams.map((participant) => (
                  <div className="flex" key={participant.teamKey}>
                    <button
                      onClick={() => console.log(participant.team.teamNumber)}
                      className="bg-green-600 hover:bg-opacity-50 rounded mb-2 h-8 px-4 mr-2"
                    >
                      View
                    </button>
                    <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2 mr-2">
                      {participant.team.teamNameShort}
                    </p>
                    <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 mr-2">
                      {participant.team.teamNumber}
                    </p>
                    {pointData != null && Object.keys(pointData).length != 0 ? (
                      <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2">
                        {pointData[participant.teamKey]}
                      </p>
                    ) : (
                      <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2">
                        No Point Data
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="bg-white rounded text-black text-center leading-8 px-2">
                  No teams found.
                </p>
              )}
            </div>
          ) : null}
        </article>
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white">
          <div className="flex items-center">
            <h2 className="text-xl">Matches</h2>
            {showMatches ? (
              <button
                onClick={() => changeMatchView()}
                className="bg-green-600 hover:bg-opacity-50 rounded h-8 px-4 mr-2 ml-auto"
              >
                Hide
              </button>
            ) : (
              <button
                onClick={() => changeMatchView()}
                className="bg-green-600 hover:bg-opacity-50 rounded h-8 px-4 mr-2 ml-auto"
              >
                Show
              </button>
            )}
          </div>
          {showMatches ? (
            <div>
              <hr className="border-solid border-2 mb-1 mt-1" />
              <h3 className="text-md">Match Name / Match Participants</h3>
              <hr className="border-solid border-2 mb-2 mt-1" />
              {eventMatches.length > 0 ? (
                eventMatches.map((match) => (
                  <div className="flex" key={match.matchName}>
                    <button
                      onClick={() => console.log(match.matchName)}
                      className="bg-green-600 hover:bg-opacity-50 rounded mb-2 h-8 px-4 mr-2"
                    >
                      View
                    </button>
                    <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2 w-36 mr-2">
                      {match.matchName}
                    </p>
                    {matchParticipants != null ? (
                      <div className="flex">
                        <p className="bg-red-300 rounded text-black text-center leading-8 px-2 mb-2 mr-2">
                          {matchParticipants[match.matchName + "Red"]}
                        </p>
                        <p className="bg-blue-200 rounded text-black text-center leading-8 px-2 mb-2">
                          {matchParticipants[match.matchName + "Blue"]}
                        </p>
                      </div>
                    ) : (
                      <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2">
                        No Data
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="bg-white rounded text-black text-center leading-8 px-2">
                  No matches found.
                </p>
              )}
            </div>
          ) : null}
        </article>
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white">
          <div className="flex items-center">
            <h2 className="text-xl">Rankings</h2>
            {showRankings ? (
              <button
                onClick={() => changeRankingView()}
                className="bg-green-600 hover:bg-opacity-50 rounded h-8 px-4 mr-2 ml-auto"
              >
                Hide
              </button>
            ) : (
              <button
                onClick={() => changeRankingView()}
                className="bg-green-600 hover:bg-opacity-50 rounded h-8 px-4 mr-2 ml-auto"
              >
                Show
              </button>
            )}
          </div>
          {showRankings ? (
            <div>
              <hr className="border-solid border-2 mb-1 mt-1" />
              <h3 className="text-md">
                Team Name / Team Number / Ranking Points
              </h3>
              <hr className="border-solid border-2 mb-2 mt-1" />
              {eventRankings.length > 0 ? (
                eventRankings.map((participant) => (
                  <div className="flex" key={participant.teamKey}>
                    <button
                      onClick={() => console.log(participant.team.teamNumber)}
                      className="bg-green-600 hover:bg-opacity-50 rounded mb-2 h-8 px-4 mr-2"
                    >
                      View
                    </button>
                    <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2 mr-2">
                      {participant.team.teamNameShort}
                    </p>
                    <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 mr-2">
                      {participant.team.teamNumber}
                    </p>
                    <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2">
                      {participant.rankingPoints}
                    </p>
                  </div>
                ))
              ) : (
                <p className="bg-white rounded text-black text-center leading-8 px-2">
                  No rankings found.
                </p>
              )}
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
