import { UserContext } from "../../lib/context";
import { useContext, useState, useEffect } from "react";
import { getDoc, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { getUserWithUsername } from "../../lib/firebase";

async function getAdminWithUsername(username) {
  const docRef = doc(firestore, "admin", "admins");
  try {
    const doc = await getDoc(docRef);
    const data = doc.data();
    if (data.users.includes(username)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

async function getAuthorizationRequests() {
  const docRef = doc(firestore, "admin", "requests");
  try {
    const doc = await getDoc(docRef);
    const users = doc.data().users;
    return users;
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

export default function AdminSettings() {
  const { username } = useContext(UserContext);
  const [adminState, setAdminState] = useState(false);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const isAdmin = await getAdminWithUsername(username);
      setAdminState(isAdmin);
      const users = await getAuthorizationRequests();
      setUserRequests(users);
    }

    fetchData();
  }, []);

  async function handleAllowAccess(event, user) {
    event.preventDefault();
    const userDoc = await getUserWithUsername(user);
    const requestDocRef = doc(firestore, "admin", "requests");
    const requestDoc = await getDoc(requestDocRef);
    try {
      await updateDoc(doc(firestore, "users", userDoc.id), {
        authorization: true,
      });
      const users = requestDoc.data().users.filter((u) => u !== user);
      await updateDoc(requestDocRef, {
        users: users,
      });
      setUserRequests(users);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  return (
    <div>
      {adminState ? (
        <div>
          <h3 className="w-56">Authorization Requests</h3>
          <hr className="border-solid border-2 mb-2 mt-1 w-56" />
          {userRequests.map((user) => (
            <div className="flex flex-col xl:flex-row" key={user}>
              <form onSubmit={(event) => handleAllowAccess(event, user)}>
                <p
                  name="user"
                  className="bg-white rounded mb-2 text-black text-center leading-8 px-2 mr-2"
                >
                  {user}
                </p>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-opacity-50 rounded h-8 w-56"
                >
                  Allow Access
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 className="w-56">You are not an admin.</h3>
          <hr className="border-solid border-2 mb-2 mt-1 w-56" />
          <p>
            If you believe this is an error, please contact an administrator.
          </p>
        </div>
      )}
    </div>
  );
}
