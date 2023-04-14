import { getRecentEvents, getRegions, getEvents } from "@/lib/orangealliance";
// Import react form component & react components
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";

export default function event() {
  // Set form properties and variables
  const { register, handleSubmit, reset, formState, formState: { errors }, watch, getValues } = useForm();
  const { region, startDate, endDate } = watch();

  const [events, setEvents] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const recentEvents = await getRecentEvents();
      setEvents(recentEvents);
      const regions = await getRegions();
      setRegions(regions);
    }

    fetchData();
  }, []);

  const handleGetEvents = async (data) => {
    const month = getValues('month');
    const region = getValues('region');
    const events = await getEvents(region, month);
    setEvents(events);
  }

  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Events</h1>
      <div className="flex">
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white w-3/12">
          <h2 className="text-xl">Filters</h2>
          <hr className="border-solid border-2 mb-2 mt-1"/>
          <form className="flex flex-col" onSubmit={handleSubmit(handleGetEvents)}>
            <select className="bg-white rounded h-8 mb-2 text-black text-center leading-8" id="region-dropdown" {...register('region', { required: true })} >
              <option>Regions</option>
              {regions.map((region) => (
                <option className="" key={region.regionKey} value={region.regionKey}>
                  {region.description}
                </option>
              ))}
            </select>
            <select className="bg-white rounded h-8 mb-2 text-black text-center leading-8" id="month-dropdown" {...register('month', { required: false })} >
              <option>Months</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <button className="bg-green-600 hover:bg-opacity-50 rounded h-8" type="submit">Search</button>
          </form>
        </article>
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white w-9/12">
          {events.map((event) => (
            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row" key={event.eventKey}>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 md:mr-2 lg:mr-0 xl:mr-2">{event.eventName}</p>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 md:mr-2 lg:mr-0 xl:mr-2">{event.startDate.slice(0, 10)}</p>
              <button className="bg-green-600 hover:bg-opacity-50 rounded h-8 px-4">View</button>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}