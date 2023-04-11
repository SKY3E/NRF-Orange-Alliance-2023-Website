import Auth from '../Auth';

export default function SideBar() {

  return (
    <nav class="h-full w-60 fixed z-10 top-0 left-0 bg-blue-900 bg-opacity-50 overflow-x-hidden p-2 mt-16">
      <Auth />
      <button className="" value="Event" onClick={""}>Event</button>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </nav>
  );
}