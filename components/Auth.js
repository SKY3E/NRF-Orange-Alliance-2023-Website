// Authentication
import { googleAuthProvider, auth, firestore } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
// Use context & react components
import { UserContext } from '../lib/context';
import { useEffect, useState, useCallback, useContext } from 'react';
// Use debounce
import debounce from 'lodash.debounce';
// Write and get documents from firestore
import { doc, getDoc, writeBatch } from 'firebase/firestore'

// Display sign in and sign out data and export it
export default function Auth() {
  const { user, username } = useContext(UserContext);

  return (
    <section className="w-full">
      {/* Check if user is signed in - if not, show sign in form, else show sign out button, else show sign in button */}
      {user ? 
        !username ? <UsernameForm /> : <SignOutButton />
        : 
        <SignInButton />
      }
    </section>
  );
}

// Create Sign In Page w/ Popup Window
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return ( 
    <section className="border-4 rounded-lg p-2 px-28 bg-red-400">
      <div className="text-slate-800">
        <h2 className="text-xl font-bold">Sign-in</h2>
        <p className="font-semibold">Access your personalized calendar</p>
      </div>
      <button className="h-16 w-56 flex items-stretch space-x-2 border-4 rounded p-2 bg-white hover:bg-gray-50 mt-2" onClick={signInWithGoogle}>
        <img src={'/google.png'} /> <div className="text-slate-800 m-auto">Sign in with Google</div>
      </button>
    </section>
  );
}

// Create Sign Out Page
function SignOutButton() {
  return(
    <section className="border-4 rounded-lg p-2 px-28 bg-red-400 flex flex-col">
      <div className="text-slate-800">
        <h2 className="text-xl font-bold">Sign-out</h2>
        <p className="font-semibold">Sign-in to another account</p>
      </div>
      <button className="w-56 border-4 rounded p-2 mt-2 bg-white hover:bg-gray-100 text-slate-800" onClick={() => auth.signOut()}>Sign out</button>
    </section>
  );
}

// Create Username Form to validate and set username
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);
  
  // On form submition, set username to firestore
  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = doc(firestore, "users", user.uid);
    const usernameDoc = doc(firestore, "usernames", formValue);

    const batch = writeBatch(firestore);
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  // On username change, check if username is valid
  const onChange = async (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // On page edits check username validity
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        console.log(username);
        const ref = doc(firestore, 'usernames', username);
        const docRef = await getDoc(ref);
        console.log('Firestore read executed!');
        if (docRef.exists()){
          setIsValid(false);
        } else {
          setIsValid(true);
        }
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section className="border-4 rounded-lg p-2 px-28 bg-red-400 flex flex-col">
        <h2 className="text-slate-800 text-xl font-bold">Create Personal Profile</h2>
        <p className="text-slate-800 text-xl font-semibold">Choose Username</p>
        <hr className="border-t-4 border-dashed"/>
        <form className="mt-2 flex space-x-4" onSubmit={onSubmit}>
          <div>
            <input className="border-4 rounded p-2 w-full focus:outline-none focus:border-slate-800 focus:ring-slate-800 focus:ring-1" name="username" placeholder="username" value={formValue} onChange={onChange} />
            <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
            <button className="w-56 border-4 rounded p-2 bg-white hover:bg-gray-100 text-slate-800" type="submit" disabled={!isValid}>
              Choose
            </button>
          </div>
          <div>
            <h3 className="text-slate-800 text-xl font-semibold">Debug State</h3>
            <div className="text-slate-800">
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </div>
        </form>
      </section>
    )
  );
}

// Create Username Message which displays username validity
function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p className="text-slate-800">Checking...</p>;
  } else if (isValid) {
    return <p className="text-slate-800">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-slate-800">That username is taken!</p>;
  } else {
    return <p className="text-slate-800">Waiting...</p>;
  }
}