import { getMatchWithKey } from "@/lib/orangealliance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function MatchPage() {
  const [matchRef, setMatchRef] = useState(null);
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
                  {matchRef.matchName}
                </p>
              </div>
            ) : (
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                Loading...
              </p>
            ) 
          )}
        </article>
      </div>
    </section>
  );
}
