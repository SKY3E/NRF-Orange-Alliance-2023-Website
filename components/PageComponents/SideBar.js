import Auth from '../Auth';

export default function SideBar() {

  return (
    <nav className="h-full w-60 fixed z-10 top-0 left-0 bg-blue-900 bg-opacity-50 overflow-x-hidden p-2 mt-16">
      <Auth />
      <a href="/event">Event</a>
      <a href="/team">Team</a>
    </nav>
  );
}