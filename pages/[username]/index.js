import Auth from "@/components/Auth";
import { getUserWithUsername } from '../../lib/firebase'; 

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
      <h1>Profile :</h1>
      <img src={user.photoURL || null} />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </section>
  );
}