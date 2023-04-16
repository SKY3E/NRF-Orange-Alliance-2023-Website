// Import helper & firestore functions
import { getGroupWithUsername } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
// Use context & react components
import { UserContext } from "../../lib/context";
import { useContext, useState, useEffect } from "react";

export default function Group() {
  const { user, username } = useContext(UserContext);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getGroupWithUsername(username)
      .then((group) => setGroup(group))
      .catch((error) => console.error(error));
  }, [username]);

  function handleJoinGroup(teamNumber) {
    const userDocRef = doc(firestore, "users", user.uid);
    updateDoc(userDocRef, { group: teamNumber })
      .then(setGroup(teamNumber))
      .then(() => console.log("Document successfully updated!"))
      .catch((error) => console.error("Error updating document: ", error));
  }

  function handleLeaveGroup() {
    const userDocRef = doc(firestore, "users", user.uid);
    updateDoc(userDocRef, { group: null })
      .then(setGroup(null))
      .then(() => console.log("Document successfully updated!"))
      .catch((error) => console.error("Error updating document: ", error));
  }

  if (user) {
    if (group === null) {
      return <JoinGroup onJoinGroup={handleJoinGroup} />;
    } else {
      return <LeaveGroup onLeaveGroup={handleLeaveGroup} />;
    }
  }
}

function LeaveGroup({ onLeaveGroup }) {
  function handleLeaveGroup(event) {
    event.preventDefault();
    onLeaveGroup();
  }

  return (
    <article>
      <h3 className="w-56">Leave Group</h3>
      <hr className="border-solid border-2 mb-2 mt-1 w-56" />
      <form className="flex flex-col items-start" onSubmit={handleLeaveGroup}>
        <button
          type="submit"
          className="bg-red-600 hover:bg-opacity-50 rounded h-8 w-56"
        >
          Leave Group
        </button>
      </form>
    </article>
  );
}

function JoinGroup({ onJoinGroup }) {
  async function handleJoinGroup(event) {
    event.preventDefault();
    const teamNumber = event.target.elements.teamNumber.value;
    onJoinGroup(teamNumber);
  }

  return (
    <article>
      <h3 className="w-56">Join Group</h3>
      <hr className="border-solid border-2 mb-2 mt-1 w-56" />
      <form className="flex flex-col items-start" onSubmit={handleJoinGroup}>
        <input
          className="hover:bg-gray-700 hover:bg-opacity-50 rounded h-8 w-56 pl-2 mb-2 text-black"
          type="number"
          name="teamNumber"
          placeholder="Team Number"
        ></input>
        <button
          type="submit"
          className="bg-green-600 hover:bg-opacity-50 rounded h-8 w-56"
        >
          Join Group
        </button>
      </form>
    </article>
  );
}
