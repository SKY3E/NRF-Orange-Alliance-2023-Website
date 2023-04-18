// Import next components, orange alliance functions, & react components
import { useRouter } from "next/router";
import {
  getTeamWithKey,
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
        .catch((error) => console.log(error));
    }
  }, [team]);
  
  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Team</h1>
      <div className="flex flex-col">
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white">
          <h2 className="text-xl">Details</h2>
          <hr className="border-solid border-2 mb-2 mt-1" />
          {teamRef ? (
            <div>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
                {teamRef.teamNameShort}
              </p>
              <div className="grid grid-cols-2">
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 mr-1">
                  {teamRef.teamNumber}
                </p>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 ml-1">
                  {teamRef.rookieYear}
                </p>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 mr-1">
                  {teamRef.country}
                </p>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 ml-1">
                  {teamRef.regionKey}
                </p>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 mr-1">
                  {teamRef.city}
                </p>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-1 ml-1">
                  {teamRef.zipCode}
                </p>
              </div>
              {teamRef.website ? (
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
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
      </div>
    </section>
  );
}
