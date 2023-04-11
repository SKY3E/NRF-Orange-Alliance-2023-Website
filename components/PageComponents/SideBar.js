import Auth from '../Auth';
import { UserContext } from '../../lib/context';
import { useContext } from 'react';
import Link from 'next/link';

export default function SideBar() {
  const { username } = useContext(UserContext);

  return (
    <nav className="h-full w-60 fixed z-10 top-0 left-0 bg-blue-900 bg-opacity-50 overflow-x-hidden p-2 mt-16">
      <Auth />
      <hr className="border-solid border-2 mt-2"/>
      <a className="bg-gray-100 bg-opacity-30 hover:bg-gray-700 hover:bg-opacity-50 rounded h-10 w-56 text-white flex items-center justify-center mt-2" href="/">
        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>  
        <div>Home</div>
      </a>
      <a className="bg-gray-100 bg-opacity-30 hover:bg-gray-700 hover:bg-opacity-50 rounded h-10 w-56 text-white flex items-center justify-center mt-2" href="/event">
        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
        </svg>
        <div>Event</div>
      </a>
      <a className="bg-gray-100 bg-opacity-30 hover:bg-gray-700 hover:bg-opacity-50 rounded h-10 w-56 text-white flex items-center justify-center mt-2" href="/team">
        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
        <div>Team</div>
      </a>
      <Link href={`/${username}`} legacyBehavior>
        <button className="bg-gray-100 bg-opacity-30 hover:bg-gray-700 hover:bg-opacity-50 rounded h-10 w-56 text-white flex items-center justify-center mt-2">
          <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>Profile</div>
        </button>
      </Link>
    </nav>
  );
}