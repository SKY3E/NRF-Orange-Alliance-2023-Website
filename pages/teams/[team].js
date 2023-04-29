// Import next components, orange alliance functions, & react components
import { useRouter } from "next/router";
import { getTeamWithKey, getEventsWithTeam } from "@/lib/orangealliance";
import TeamRemarks from "@/components/PageComponents/TeamRemarks";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { UserContext } from "../../lib/context";
import { useContext } from "react";
import { getAuthorizationWithUsername } from "../../lib/firebase";
import Unauthorized from "../../components/SiteComponents/Unauthorized";

export default function TeamPage() {
  // Define team, event, authorization & loading states
  const [teamRef, setTeamRef] = useState(null);
  const [teamEvents, setTeamEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  // Define user context
  const { user, username } = useContext(UserContext);
  // Define router components
  const router = useRouter();
  const { team } = router.query;

  // Retrieve event data
  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        const authorization = await getAuthorizationWithUsername(username);
        setAuthorization(authorization);
      }
    }
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (team && authorization !== false) {
      setIsLoading(true);
      getTeamWithKey(team)
        .then((teamData) => setTeamRef(teamData))
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error));
      setIsLoading(true);
      getEventsWithTeam(team)
        .then((eventData) => setTeamEvents(eventData))
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error));
    }
  }, [team, authorization]);

  function handleViewEvent(event) {
    const eventKey = event.eventKey;
    router.push(`/events/${eventKey}`);
  };

  if (authorization == true && user != null) {
    return (
      <section className="ml-4 lg:ml-64 mt-20">
        <h1 className="text-3xl font-bold w-full mb-2">Team</h1>
        <div className="flex flex-col">
          <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
            <h2 className="text-xl">Details</h2>
            <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
            {isLoading ? (
              <Loading />
            ) : (
              teamRef ? (
                <div>
                  <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                    {teamRef.teamNameShort}
                  </p>
                  <div className="grid grid-cols-2">
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 mr-1 border-2 border-gray-300">
                      {teamRef.teamNumber}
                    </p>
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 ml-1 border-2 border-gray-300">
                      {teamRef.rookieYear}
                    </p>
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 mr-1 border-2 border-gray-300">
                      {teamRef.country}
                    </p>
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 ml-1 border-2 border-gray-300">
                      {teamRef.regionKey}
                    </p>
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 mr-1 border-2 border-gray-300">
                      {teamRef.city}
                    </p>
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 ml-1 border-2 border-gray-300">
                      {teamRef.zipCode}
                    </p>
                  </div>
                  {teamRef.website ? (
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                      {teamRef.website}
                    </p>
                  ) : null}
                </div>
              ) : (
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
                  Loading...
                </p>
              )
            )}
          </article>
          <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
            <h2 className="text-xl">Event Participations</h2>
            <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
            {isLoading ? (
              <Loading />
            ) : (
              teamEvents ? (
                <div>
                  {teamEvents.map((event) => (
                    <div
                      className="flex flex-col md:flex-row lg:flex-col xl:flex-row"
                      key={event.eventKey}
                    >
                      <button
                        onClick={() => handleViewEvent(event)}
                        className="bg-green-600 hover:bg-opacity-50 rounded mb-2 h-8 px-4 md:mr-2 lg:mr-0 xl:mr-2"
                      >
                        View
                      </button>
                      <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 md:mr-2 lg:mr-0 xl:mr-2 border-2 border-gray-300">
                        {event.eventKey}
                      </p>
                      <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                        {event.eventName}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
                  No events found.
                </p>
              )
            )}
          </article>
          <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
            <TeamRemarks />
          </article>
        </div>
      </section>
    );
  } else {
    return <Unauthorized />;
  }
}
