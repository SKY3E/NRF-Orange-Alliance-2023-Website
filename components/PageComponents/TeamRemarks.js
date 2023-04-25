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
      return 
    } else {
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
        .then(() => console.log("Remarks successfully updated!"))
        .catch((error) => console.error("Error updating group document: ", error));
    }
  }

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
}
