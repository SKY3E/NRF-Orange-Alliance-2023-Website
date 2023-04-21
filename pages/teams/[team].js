// Import next components, orange alliance functions, & react components
import { useRouter } from "next/router";
import {
  getTeamWithKey,
  getEventWithTeam,
} from "@/lib/orangealliance";
import { useEffect, useState } from "react";

export default function TeamPage() {
  // Define event details
  const [teamRef, setTeamRef] = useState(null);
  // Define router components
  const router = useRouter();
  const { team } = router.query;

  // Retrieve event data
  useEffect(() => {
    if (team) {
      getTeamWithKey(team)
        .then((teamData) => setTeamRef(teamData))
        .then((teamData) => console.log(teamData))
        .catch((error) => console.log(error));
    }
  }, [team]);
  
  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Team</h1>
      <div className="flex flex-col">
        <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
          <h2 className="text-xl">Details</h2>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          {teamRef ? (
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
          )}
        </article>
        <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
          <h2 className="text-xl">Placeholder</h2>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
        </article>
      </div>
    </section>
  );
}
