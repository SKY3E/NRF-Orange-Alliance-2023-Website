import { getAuthorizationWithUsername } from '@/lib/firebase';
import { UserContext } from '../../lib/context';
import { useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from '../../lib/firebase';

function AuthorizationState() {
  const { username } = useContext(UserContext);
  const [authorizationState, setAuthorizationState] = useState(null);

  useEffect(() => {
    async function fetchAuthorizationState() {
      try {
        const result = await getAuthorizationWithUsername(username);
        setAuthorizationState(result);
      } catch (error) {
        console.log(error);
        setAuthorizationState(false);
      }
    }

    fetchAuthorizationState();
  }, [username]);

  function RequestAuthorization() {
    const docRef = doc(firestore, 'admin', 'requests');

    getDoc(docRef)
      .then((doc) => {     
        const data = doc.data();
        if (data.users.includes(username)) {
          return
        } else {
          // If the user is not in the array, add them
          updateDoc(docRef, {
            users: arrayUnion(username)
          });
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  }

  if (authorizationState === true) {
    return (
      <p className="bg-white rounded h-8 w-56 mb-2 text-black text-center leading-8">Status : <span className="text-green-600 text-opacity-70">Allowed</span></p>
    );
  } else if (authorizationState === false) {
    return (
      <div className="flex flex-col">
        <p className="bg-white rounded h-8 w-56 mb-2 text-black text-center leading-8">Status : <span className="text-red-600 text-opacity-70">Disallowed</span></p>
        <button className="bg-green-600 hover:bg-opacity-50 rounded h-8 w-56" onClick={RequestAuthorization}>Request Access</button>
      </div>
    );
  } else {
    return (
      <p>Fetching Authorization Data...</p>
    );
  }
}

export default function Authorization() {
  return (
    <article>
      <h3 className="mt-2 md:mt-0">Authorization Status</h3>
      <hr className="border-solid border-2 mb-2 mt-1 w-56"/>
      <AuthorizationState />
    </article>
  );
}
