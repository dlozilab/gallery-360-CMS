
import { getFirestore, doc, updateDoc,collection,addDoc,getDocs } from "firebase/firestore";


const db = getFirestore();

export async function updateRecord(
  collection,
  recordID,
  data,
) {

  //console.log("This function ran...")

  try {
    const docRef = doc(db, collection, recordID); // Get a reference to the document

    await updateDoc(docRef, data); // Wait for the update to complete
    
  } catch (error) {
    console.error("Error updating document:", error);
  }
}


export async function createRecord(collectionName, data) {
  console.log("Colleection: ",collectionName)
  try {
    const collectionRef = collection(db, collectionName); // Get a reference to the collection
    const docRef = await addDoc(collectionRef, data); // Add a new document with the given data
    console.log("Document created with ID:", docRef.id);
  } catch (error) {
    console.error("Error creating document:", error);
  }
}

//createRecord("Market", artwork)


// Function to add multiple artworks to the database
export async function addArtworksToDatabase(collectionName, artworks) {
  for (const artwork of artworks) {
    await createRecord(collectionName, artwork);
  }
}

//Call the function to add artworks to the "Market" collection
// addArtworksToDatabase("artists", artists)
//   .then(() => {
//     console.log("All artworks added successfully.");
//   })
//   .catch((error) => {
//     console.error("Error adding artworks:", error);
//   });

const videoUrls = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
];

// Function to add missing fields to all artist documents
export async function updateAllArtistsWithUrls() {
try {
  const collectionRef = collection(db, "artists");
  const querySnapshot = await getDocs(collectionRef);

  let videoIndex = 0; // To cycle through video URLs

  // Iterate over each document in the collection
  querySnapshot.forEach(async (docSnapshot) => {
    const videoUrl = videoUrls[videoIndex % videoUrls.length];
    const websiteUrl = `https://examplewebsite${videoIndex + 1}.com`;

    // Prepare the update data
    const updateData = {
      videoUrl: videoUrl,
      websiteUrl: websiteUrl
    };

    // Call updateRecord to update the document
    await updateRecord("artists", docSnapshot.id, updateData);

    // Move to the next video URL
    videoIndex++;
  });

  console.log("All artist records updated successfully with videoUrl and websiteUrl.");
} catch (error) {
  console.error("Error updating artist records:", error);
}
}

//updateAllArtistsWithUrls()


export async function assignArtistIDsToArtworks() {
  try {
    // Step 1: Retrieve all artist IDs from the artists collection
    const artistCollectionRef = collection(db, "artists");
    const artistSnapshot = await getDocs(artistCollectionRef);
    const artistIDs = artistSnapshot.docs.map(doc => doc.id); // Get array of artist IDs

    if (artistIDs.length === 0) {
      console.log("No artists found in the 'artists' collection.");
      return;
    }

    // Step 2: Retrieve all artworks in the Market collection
    const marketCollectionRef = collection(db, "Market");
    const artworkSnapshot = await getDocs(marketCollectionRef);

    // Step 3: Assign an artistID to each artwork
    for (const artworkDoc of artworkSnapshot.docs) {
      // Select a random artist ID from the list (can assign an artist multiple times)
      const randomArtistID = artistIDs[Math.floor(Math.random() * artistIDs.length)];

      // Update the artwork with the selected artistID
      await updateDoc(doc(db, "Market", artworkDoc.id), { artistID: randomArtistID });
      console.log(`Artwork ID ${artworkDoc.id} assigned to artist ID ${randomArtistID}`);
    }

    console.log("All artworks in 'Market' collection have been assigned an artistID.");
  } catch (error) {
    console.error("Error assigning artist IDs to artworks:", error);
  }
}

//assignArtistIDsToArtworks()