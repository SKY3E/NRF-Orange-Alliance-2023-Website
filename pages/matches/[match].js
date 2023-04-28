import { getMatchWithKey, getParticipantsWithMatch } from "@/lib/orangealliance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function MatchPage() {
  const [matchRef, setMatchRef] = useState(null);
  const [matchParticipants, setMatchParticipants] = useState(null);
  // Define router components
  const router = useRouter();
  const { match } = router.query;
  // Define loading states
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (match) {
      setIsLoading(true);
      getMatchWithKey(match)
        .then((matchData) => setMatchRef(matchData))
        .then(() => setIsLoading(false))
        .catch((error) => console.log(error));
    }
  }, [match])
  useEffect(() => {
    if (match != null) {
      try {
        const matchParticipants = getParticipantsWithMatch(matchRef);
        setMatchParticipants(matchParticipants);
      } catch (error) {
        console.log(error);
      }
    }
  }, [match]);

  useEffect(() => {
    console.log(matchRef);
  }, [matchRef])

  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Match</h1>
      <div className="flex flex-col">
        <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
          <h2 className="text-xl">Details</h2>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          {isLoading ? (
            <Loading />
          ) : (
            matchRef ? (
              <div>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                  {matchRef.matchName} - {matchRef.eventKey}
                </p>
                <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                  {new Date(matchRef.scheduledTime).toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                    timeZone: 'UTC'
                  })}
                </p>
              </div>
            ) : (
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                Loading...
              </p>
            ) 
          )}
        </article>
        <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
          <h2 className="text-xl">Scores</h2>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          {isLoading ? (
            <Loading />
          ) : (
            matchRef ? (
              <div>
                <div className="grid grid-cols-3">
                  <p className="bg-blue-200 rounded mb-2 mr-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.blueScore}
                  </p>
                  <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 border-2 border-gray-300">
                    Score
                  </p>
                  <p className="bg-red-300 rounded mb-2 ml-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.redScore}
                  </p>
                  <p className="bg-blue-200 rounded mb-2 mr-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.blueAutoScore}
                  </p>
                  <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 border-2 border-gray-300">
                    Auto
                  </p>
                  <p className="bg-red-300 rounded mb-2 ml-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.redAutoScore}
                  </p>
                  <p className="bg-blue-200 rounded mb-2 mr-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.blueTeleScore}
                  </p>
                  <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 border-2 border-gray-300">
                    Tele
                  </p>
                  <p className="bg-red-300 rounded mb-2 ml-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.redTeleScore}
                  </p>
                  <p className="bg-blue-200 rounded mb-2 mr-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.blueEndScore}
                  </p>
                  <p className="bg-white rounded text-black text-center leading-8 px-2 mb-2 border-2 border-gray-300">
                    End
                  </p>
                  <p className="bg-red-300 rounded mb-2 ml-1 text-black text-center leading-8 px-1 border-2 border-gray-300">
                    {matchRef.redEndScore}
                  </p>
                </div>
              </div>
            ) : (
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                Loading...
              </p>
            ) 
          )}
        </article>
        <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
          <h2 className="text-xl">Participants</h2>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          {matchParticipants != null ? (
            <div className="flex">
              <p className="bg-red-300 rounded text-black text-center leading-8 px-2 mb-2 mr-2 border-2 border-gray-300 w-1/2">
                {matchParticipants[matchRef.matchName + "Red"]}
              </p>
              <p className="bg-blue-200 rounded text-black text-center leading-8 px-2 mb-2 border-2 border-gray-300 w-1/2">
                {matchParticipants[matchRef.matchName + "Blue"]}
              </p>
            </div>
          ) : (
            <p className="bg-gray-200 rounded text-black text-center leading-8 px-2 mb-2 border-2 border-gray-300">
              No Data
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
