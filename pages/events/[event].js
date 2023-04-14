import { useRouter } from 'next/router';
import { getEventWithKey } from '@/lib/orangealliance';
import { useEffect, useState } from 'react';

export default function EventPage() {
  const [eventRef, setEventRef] = useState(null);
  const router = useRouter();
  const { event } = router.query;
  
  useEffect(() => {
    if (event) {
      getEventWithKey(event)
        .then((eventData) => setEventRef(eventData))
        .catch((error) => console.log(error));
    }
  }, [event]);

  return (
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">Event</h1>
      <div className="lg:flex lg:justify-between"></div>
      <div className="flex flex-col md:flex-row mr-4 md:mr-0">
        <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white w-full md:w-1/2">
          <h2 className="text-xl">Details</h2>
          <hr className="border-solid border-2 mb-2 mt-1"/>
          {eventRef ? (
            <div>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">{eventRef.eventName}</p>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">Start Date : {eventRef.startDate.substring(0, 10)}</p>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">End Date : {eventRef.endDate.substring(0, 10)}</p>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">City : {eventRef.city}</p>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">Region : {eventRef.regionKey}</p>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">Venue : {eventRef.venue}</p>
              <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">Event Type : {eventRef.eventTypeKey}</p>
            </div>
          ) : (
            <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2">Loading...</p>
          )}
        </article>
      </div>
    </section>
  );
}
