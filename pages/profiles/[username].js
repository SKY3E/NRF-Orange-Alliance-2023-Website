// Import firebase and website components 
import { getUserWithUsername } from "../../lib/firebase";
import Group from "@/components/PageComponents/Group";
import Authorization from "@/components/PageComponents/Authorization";
import InfoTab from "@/components/PageComponents/InfoTab";

// Get username from url and pass user through props
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
    <section className="ml-4 lg:ml-64 mt-20">
      <h1 className="text-3xl font-bold w-full mb-2">
        Welcome back, {user.displayName}
      </h1>
      <div className="lg:flex lg:justify-between">
        <div>
          <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
            <h2 className="text-xl">Account Info</h2>
            <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
            <div className="flex">
              <img
                className="rounded-full border-4 border-blue-900 border-opacity-50 h-16 w-16"
                src={user.photoURL || null}
              />
              <div className="flex flex-col items-center justify-center ml-4">
                <p>@{user.username}</p>
                <h1>{user.displayName || "Anonymous User"}</h1>
              </div>
            </div>
          </article>
          <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
            <h2 className="text-xl">Security Info</h2>
            <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
            <div className="flex flex-col md:flex-row md:justify-around lg:justify-between lg:space-x-4">
              <Group />
              <Authorization />
            </div>
          </article>
        </div>
        <div className="w-full">
          <article className="rounded bg-white bg-opacity-50 p-2 mr-4 mb-2 text-black border-2 border-gray-300">
            <InfoTab />
          </article>
        </div>
      </div>
    </section>
  );
}
