// Import firebase packages and functions
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB06yA28fNBJl9IYENE14eK-EKP8s5nylw",
  authDomain: "orange-alliance-2023-website.firebaseapp.com",
  projectId: "orange-alliance-2023-website",
  storageBucket: "orange-alliance-2023-website.appspot.com",
  messagingSenderId: "928972061008",
  appId: "1:928972061008:web:a73aa47140f3faf89e1455",
  measurementId: "G-E7Y949XRDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
// Initialize Firebase Firestore
export const firestore = getFirestore(app);

// Helper functions
export async function getUserWithUsername(username) {
  const queryRef = query(
    collection(firestore, 'users'),
    limit(1),
    where('username', "==", username)
  );
  const userDoc = (await getDocs(queryRef)).docs[0];
  return userDoc;
}

export async function getGroupWithUsername(username) {
  return getUserWithUsername(username)
  .then(userDoc => {
    if (userDoc.data().group != null) {
      return userDoc.data().group;
    } else {
      return null;
    }
  })
  .catch(error => {
    console.error(error);
  });
}

export async function getAuthorizationWithUsername(username) {
  return getUserWithUsername(username)
  .then(userDoc => {
    console.log(userDoc.data().authorization);
    if (userDoc.data().authorization == true) {
      return true;
    } else {
      return false;
    }
  })
  .catch(error => {
    console.error(error);
  });
}