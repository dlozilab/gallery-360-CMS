import { getFirestore, doc, updateDoc } from "firebase/firestore";

// Your Firebase SDK Initialization code here

const db = getFirestore(); // initialize Firestore

export async function updateRecord(
  collection,
  recordID,
  data,
  reload,
  setReload
) {
  try {
    const docRef = doc(db, collection, recordID); // Get a reference to the document

    await updateDoc(docRef, data); // Wait for the update to complete
    setReload(!reload);
    console.log(
      `Record:${recordID} [from ${collection}] has been successfully updated!`
    );
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

