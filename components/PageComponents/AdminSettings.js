// Import context, react, & firebase components
import { UserContext } from "../../lib/context";
import { useContext, useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { getUserWithUsername } from "../../lib/firebase";

// Fetch admin state
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
// Post authorization request
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
  // Retrieve username context & define admine state & user requests
  const { username } = useContext(UserContext);
  const [adminState, setAdminState] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  // Retrieve data on page load
  useEffect(() => {
    async function fetchData() {
      const isAdmin = await getAdminWithUsername(username);
      setAdminState(isAdmin);
      const users = await getAuthorizationRequests();
      setUserRequests(users);
    }

    fetchData();
  }, []);
  // Set user authorization access
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
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1 w-56" />
          {userRequests.length < 1 ? (
            <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
              No authorization requests found.
            </p>
          ) : (
            userRequests.map((user) => (
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
            ))
          )}
        </div>
      ) : (
        <div>
          <h3 className="w-56">You are not an admin.</h3>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1 w-56" />
          <p className="bg-white rounded mb-2 text-black text-center leading-8 px-2 border-2 border-gray-300">
            If you believe this is an error, please contact an administrator.
          </p>
        </div>
      )}
    </div>
  );
}
