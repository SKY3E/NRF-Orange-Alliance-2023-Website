import { getTeamsWithKey } from "@/lib/orangealliance";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import { getAuthorizationWithUsername } from "@/lib/firebase";
import Unauthorized from "../components/SiteComponents/Unauthorized";

export default function team() {
  // Set form properties & variables & other variables
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  // Define teams, and authorization states
  const [teams, setTeams] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  // Fetch data if user is authorized
  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        const authorization = await getAuthorizationWithUsername(username);
        setAuthorization(authorization);
      }
    }

    fetchData();
  }, [authorization, user]);

  const handleGetTeams = async (data) => {
    const teamNumber = getValues("teamNumber");
    const teams = await getTeamsWithKey(teamNumber);
    setTeams(teams);
    reset();
  };
  // Route player to selected team
  const handleViewTeam = (team) => {
    const teamKey = team.teamKey;
    router.push(`/teams/${teamKey}`);
  };

  if (authorization == true && user != null) {
    return (
      <section className="ml-4 lg:ml-64 mt-20">
        <h1 className="text-3xl font-bold w-full mb-2">Teams</h1>
        <div className="flex flex-col md:flex-row mr-4 md:mr-0">
          <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white w-full md:w-3/12 h-36">
            <h2 className="text-xl">Filters</h2>
            <hr className="border-solid border-2 mb-2 mt-1" />
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(handleGetTeams)}
            >
              <input
                className="hover:bg-gray-700 hover:bg-opacity-50 rounded h-8 w-full pl-2 mb-2 text-black"
                type="number"
                id="teamNumber"
                placeholder="Team Number"
                {...register("teamNumber", { required: true })}
              ></input>
              <button
                type="submit"
                className={`bg-green-600 hover:bg-opacity-50 rounded h-8 ${
                  !formState.isValid ? "cursor-not-allowed" : ""
                }`}
                disabled={!formState.isValid}
              >
                Search Team
              </button>
            </form>
          </article>
          <article className="rounded bg-blue-900 bg-opacity-50 px-2 pt-2 mr-4 mb-2 text-white w-full md:w-9/12 flex-grow">
            <h2 className="text-xl">Teams</h2>
            <hr className="border-solid border-2 mb-2 mt-1" />
              <div>
                <h3 className="mt-2">Team Search Results</h3>
                <hr className="border-solid border-2 mb-2 mt-1 w-56" />
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <div
                      className="flex flex-col md:flex-row lg:flex-col xl:flex-row"
                      key={team.teamKey}
                    >
                      <button
                        onClick={() => handleViewTeam(team)}
                        className="bg-green-600 hover:bg-opacity-50 rounded mb-2 h-8 px-4 md:mr-2 lg:mr-0 xl:mr-2"
                      >
                        View
                      </button>
                      <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 md:mr-2 lg:mr-0 xl:mr-2">
                        {team.teamKey}
                      </p>
                      <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">
                        {team.teamNameShort}
                      </p>
                    </div>
                  ))
                ) : (
                  <div>No teams found. Please search for an existing team.</div>
                )}
              </div>
          </article>
        </div>
      </section>
    );
  } else {
    return <Unauthorized />;
  }
}
