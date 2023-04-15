import { useRouter } from 'next/router';
import { getEventWithKey, getTeamsWithEvent, getRankingsWithEvent } from '@/lib/orangealliance';
import { use, useEffect, useState } from 'react';

export default function EventPage() {
  const [eventRef, setEventRef] = useState(null);
  const [eventTeams, setEventTeams] = useState([]);
  const [eventRankings, setEventRankings] = useState([]);
  const router = useRouter();
  const { event } = router.query;
  
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
        .then(teamData => setEventTeams(teamData))
        .catch((error) => console.log(error));
      getRankingsWithEvent(eventRef)
        .then(eventRankings => setEventRankings(eventRankings))
        .catch((error) => console.log(error));
    }
  }, [eventRef]);

  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Event</h1>
      <div className="lg:flex lg:justify-between"></div>
      <div className="flex flex-col md:flex-row mr-4 md:mr-0">
        <div className="w-full md:w-7/12">
          <article className="flex-grow rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-4 text-white">
            <h2 className="text-xl">Details</h2>
            <hr className="border-solid border-2 mb-2 mt-1"/>
            {eventRef ? (
              <div>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">{eventRef.eventName}</p>
                <div className="grid grid-cols-2">
                  <p className="bg-white rounded mb-2 mr-1 text-black text-center leading-8 px-1">Start Date : {eventRef.startDate.substring(0, 10)}</p>
                  <p className="bg-white rounded mb-2 ml-1 text-black text-center leading-8 px-1">End Date : {eventRef.endDate.substring(0, 10)}</p>
                  <p className="bg-white rounded mb-2 mr-1 text-black text-center leading-8 px-1">City : {eventRef.city}</p>
                  <p className="bg-white rounded mb-2 ml-1 text-black text-center leading-8 px-1">Region : {eventRef.regionKey}</p>
                  <p className="bg-white rounded mb-2 mr-1 text-black text-center leading-8 px-1">Venue : {eventRef.venue}</p>
                  <p className="bg-white rounded mb-2 ml-1 text-black text-center leading-8 px-1">Event Type : {eventRef.eventTypeKey}</p>
                </div>
              </div>
            ) : (
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">Loading...</p>
            )}
          </article>
          <article className="flex-grow rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white">
            <h2 className="text-xl">Rankings</h2>
            <hr className="border-solid border-2 mb-1 mt-1"/>
            <h3 className="text-md">Name / Team Number / Ranking Points</h3>
            <hr className="border-solid border-2 mb-2 mt-1"/>
            {eventRankings.length > 0 ? (
              eventRankings.map((participant) => (
                <div className="flex" key={participant.teamKey}>
                  <button onClick={() => console.log(participant.team.teamNumber)} className="bg-green-600 hover:bg-opacity-50 rounded mb-2 h-8 px-4 mr-2">View</button>
                  <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 mr-2">{participant.team.teamNameShort}</p>
                  <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 mr-2">{participant.team.teamNumber}</p>
                  <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2">{participant.rankingPoints}</p>
                </div>
              ))
            ) : (
              <p className="bg-white rounded text-black text-center leading-8 px-2">No rankings found.</p>
            )}
          </article>
        </div>
        <article className="flex-grow rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white w-full md:w-5/12">
          <h2 className="text-xl">Teams</h2>
          <hr className="border-solid border-2 mb-1 mt-1"/>
          <h3 className="text-md">Name / Team Number</h3>
          <hr className="border-solid border-2 mb-2 mt-1"/>
          {eventTeams.length > 0 ? (
            eventTeams.map((participant) => (
              <div className="flex" key={participant.teamKey}>
                <button onClick={() => console.log(participant.team.teamNumber)} className="bg-green-600 hover:bg-opacity-50 rounded mb-2 h-8 px-4 mr-2">View</button>
                <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 mr-2">{participant.team.teamNameShort}</p>
                <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2">{participant.team.teamNumber}</p>
              </div>
            ))
          ) : (
            <p className="bg-white rounded text-black text-center leading-8 px-2">No teams found.</p>
          )}
        </article>
      </div>
    </section>
  );
}
