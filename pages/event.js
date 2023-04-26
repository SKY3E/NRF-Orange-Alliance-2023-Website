// Import orange alliance, react, react form, & next components, context & authorization components
import { getRecentEvents, getRegions, getEvents } from "@/lib/orangealliance";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import { getAuthorizationWithUsername } from "@/lib/firebase";
import Unauthorized from "../components/SiteComponents/Unauthorized";
import Loading from "../components/Loading";

export default function event() {
  // Set form properties & variables & other variables
  const { register, handleSubmit, getValues } = useForm();
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  // Define events, region, loading and authorization states
  const [events, setEvents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [authorization, setAuthorization] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Fetch data if user is authorized
  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        const authorization = await getAuthorizationWithUsername(username);
        setAuthorization(authorization);
      }
      if (authorization != false) {
        const regions = await getRegions();
        setRegions(regions);
        setIsLoading(true);
        const recentEvents = await getRecentEvents();
        setEvents(recentEvents);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [authorization, user]);
  // Fetch event 
  const handleGetEvents = async (data) => {
    const month = getValues("month");
    const region = getValues("region");
    setIsLoading(true);
    const events = await getEvents(region, month);
    setEvents(events);
    setIsLoading(false);
  };
  // Route player to selected event
  const handleViewEvent = (event) => {
    const eventKey = event.eventKey;
    router.push(`/events/${eventKey}`);
  };

  if (authorization == true && user != null) {
    return (
      <section className="ml-4 lg:ml-64 mt-20">
        <h1 className="text-3xl font-bold w-full mb-2">Events</h1>
        <div className="flex flex-col md:flex-row mr-4 md:mr-0">
          <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black w-full md:w-3/12 h-44 border-2 border-gray-300">
            <h2 className="text-xl">Filters</h2>
            <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(handleGetEvents)}
            >
              <select
                className="bg-white rounded h-8 mb-2 text-black text-center leading-8 border-2 border-gray-300"
                id="region-dropdown"
                {...register("region", { required: true })}
              >
                <option>Regions</option>
                {regions.map((region) => (
                  <option
                    className=""
                    key={region.regionKey}
                    value={region.regionKey}
                  >
                    {region.description}
                  </option>
                ))}
              </select>
              <select
                className="bg-white rounded h-8 mb-2 text-black text-center leading-8 border-2 border-gray-300"
                id="month-dropdown"
                {...register("month", { required: false })}
              >
                <option>Months</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>CMPHOU</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
              </select>
              <button
                className="bg-green-600 hover:bg-opacity-50 rounded h-8"
                type="submit"
              >
                Search
              </button>
            </form>
          </article>
          <article className="rounded bg-white bg-opacity-50 px-2 pt-2 mr-4 mb-2 text-black w-full md:w-9/12 flex-grow border-2 border-gray-300">
            <h2 className="text-xl">Events</h2>
            <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
            {isLoading ? (
              <Loading />
            ) : (
              events.length > 0 ? (
                events.map((event) => (
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
                      {event.eventName}
                    </p>
                    <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
                      {event.startDate.slice(0, 10)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="bg-white rounded text-black text-center leading-8 px-2 border-2 border-gray-300">
                  No events found.
                </p>
              )
            )}
          </article>
        </div>
      </section>
    );
  } else {
    return <Unauthorized />;
  }
}
