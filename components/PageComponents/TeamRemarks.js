import { useState, useEffect } from "react";
import { getGroupWithUsername } from "@/lib/firebase";
import { UserContext } from "../../lib/context";
import { useContext } from "react";
import { doc, updateDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { useRouter } from "next/router";

function ShowTabButton({ showTab, onTabButtonClick }) {
  if (showTab === "Edit") {
    return (
      <section>
        <button
          value="View"
          onClick={onTabButtonClick}
          className="bg-white bg-opacity-50 hover:bg-blue-900 hover:bg-opacity-30 rounded h-6 w-24 text-black border-2 border-gray-300 flex items-center justify-center"
        >
          View
        </button>
      </section>
    );
  } else if (showTab === "View") {
    return (
      <section>
        <button
          value="Edit"
          onClick={onTabButtonClick}
          className="bg-white bg-opacity-50 hover:bg-blue-900 hover:bg-opacity-30 rounded h-6 w-24 text-black border-2 border-gray-300 flex items-center justify-center"
        >
          Edit
        </button>
      </section>
    );
  }
}

export default function TeamRemarks() {
  const [showTab, setShowTab] = useState("View");
  const [text, setText] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const { username } = useContext(UserContext);

  // Define router components
  const router = useRouter();
  const { team } = router.query;

  // Firestore fetchings functions
  useEffect(() => {
    getTeamRemarks();
  }, [username, team, showTab]);

  async function getTeamRemarks() {
    const group = await getGroupWithUsername(username);
    if (group == null) {
      setIsGroup(false);
    } else {
      setIsGroup(true);
      const groupDoc = doc(firestore, "groups", group);
      const groupTeamCollection = collection(groupDoc, group + "-TeamRemarks");
      getDocs(groupTeamCollection)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id == team) {
              setText(doc.data().remarks);
            }
          });
        })
    }
  }

  function handleTabButtonClick(event) {
    setShowTab(event.target.value);
  }
  function handleTextAreaChange(event) {
    setText(event.target.value);
  }
  async function handleTextAreaSubmit(event) {
    event.preventDefault();
    const group = await getGroupWithUsername(username);
    if (group == null) {
      return 
    } else {
      const groupDoc = doc(firestore, "groups", group);
      const groupTeamCollection = collection(groupDoc, group + "-TeamRemarks");
      const groupTeamRemarksDoc = doc(groupTeamCollection, team);
      await setDoc(groupTeamRemarksDoc, { teamNumber: team, remarks: "" }, { merge: false });
      updateDoc(groupTeamRemarksDoc, {
        remarks: text
      })
        .then(() => setShowTab("View"))
        .catch((error) => console.error("Error updating group document: ", error));
    }
  }

  if (isGroup) {
    if (showTab == "View") {
      return (
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl">Team Remarks</h2>
            <ShowTabButton
              showTab={showTab}
              onTabButtonClick={handleTabButtonClick}
            />
          </div>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          <p className="bg-white rounded text-black p-2 border-2 border-gray-300">{text}</p>
        </div>
      );
    }
    if (showTab == "Edit") {
      return (
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl">Team Remarks</h2>
            <ShowTabButton
              showTab={showTab}
              onTabButtonClick={handleTabButtonClick}
            />
          </div>
          <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
          <form onSubmit={handleTextAreaSubmit}>
            <textarea
              value={text}
              onChange={handleTextAreaChange}
              className="bg-white rounded text-black px-1 border-2 border-gray-300 resize-w-none w-full"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-opacity-50 rounded h-8 w-full"
            >
              Submit
            </button>
          </form>
        </div>
      );
    }
  } else {
    return (
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Team Remarks</h2>
        </div>
        <hr className="border-solid border-blue-900 border-opacity-50 border-2 mb-2 mt-1" />
        <div className="bg-white rounded text-black p-2 border-2 border-gray-300 flex items-center space-x-2">
          <svg
            className="h-6 w-6 text-blue-900 opacity-50"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            />
          </svg>
          <p>You are not in a group - please join one in the profile tab to add remarks.</p>
        </div>
      </div>
    );
  }
}
