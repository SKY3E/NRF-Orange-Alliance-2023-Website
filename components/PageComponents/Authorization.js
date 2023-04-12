import { getGroupWithUsername, getUserWithUsername } from "@/lib/firebase";
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../lib/firebase';
// Use context & react components
import { UserContext } from '../../lib/context';
import { useContext, useState, useEffect } from 'react';

export default function Authorization() {
  const { user, username } = useContext(UserContext);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getGroupWithUsername(username)
      .then(group => setGroup(group))
      .catch(error => console.error(error));
  }, [username]);

  function handleJoinGroup(teamNumber) {
    const userDocRef = doc(firestore, "users", user.uid);
    updateDoc(userDocRef, { group: teamNumber })
      .then(setGroup(teamNumber))
      .then(() => console.log('Document successfully updated!'))
      .catch(error => console.error('Error updating document: ', error));
  }

  if (user) {
    if (group === null) {
      return <JoinGroup onJoinGroup={handleJoinGroup} />;
    } else {
      return <LeaveGroup />;
    }
  }
}

function LeaveGroup() {
  return (
    <div>Leave Group</div>
  );
}

function JoinGroup({ onJoinGroup }) {
  const { username } = useContext(UserContext);
  const [userDoc, setUserDoc] = useState(null);
  useEffect(() => {
    getUserWithUsername(username)
      .then(userDoc => setUserDoc(userDoc))
      .catch(error => console.error(error));
  }, [username]);

  async function handleJoinGroup(event) {
    event.preventDefault();
    const teamNumber = event.target.elements.teamNumber.value;
    onJoinGroup(teamNumber);
  }

  return (
    <article>
      <div className="w-56">Join Group</div>
      <hr className="border-solid border-2 mb-2 mt-1 w-56"/>
      <form className="flex flex-col items-start" onSubmit={handleJoinGroup}>
        <input className="hover:bg-gray-700 hover:bg-opacity-50 rounded h-8 w-56 pl-2 mb-2 text-black" type='number' name="teamNumber" placeholder="Team Number"></input>
        <button type="submit" className="bg-green-600 hover:bg-opacity-50 rounded h-8 w-56">Join Group</button>
      </form>
    </article>
  );
}