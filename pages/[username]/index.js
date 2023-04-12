import Auth from "@/components/Auth";
import { getUserWithUsername } from '../../lib/firebase'; 
import Authorization from "@/components/PageComponents/Authorization";

export async function getServerSideProps(context) {
  const username = context.params.username;

  const userDoc = await getUserWithUsername(username);
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  if (userDoc) {
    user = userDoc.data();
  }

  return {
    props: { user },
  };
}

export default function Profile({ user }) {

  return (
    <section className="ml-64 mt-2">
      <h1 className="text-3xl font-bold w-2/6 mb-2">Welcome back, {user.displayName}</h1>
      <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white w-1/2">
        <h2 className="text-xl">Account Info</h2>
        <hr className="border-solid border-2 mb-2 mt-1"/>
        <div className="flex">
          <img className="rounded-full border-4 border-gray-100 border-opacity-30 h-16 w-16" src={user.photoURL || null} />
          <div className="flex flex-col items-center justify-center ml-4">
            <p>
              <i>@{user.username}</i>
            </p>
            <h1>{user.displayName || 'Anonymous User'}</h1>
          </div>
        </div>
      </article>
      <article className="rounded bg-blue-900 bg-opacity-50 p-2 mr-4 mb-2 text-white w-1/2">
        <h2 className="text-xl">Security Info</h2>
        <hr className="border-solid border-2 mb-2 mt-1"/>
        <Authorization />
      </article>
    </section>
  );
}