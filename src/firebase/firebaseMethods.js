
import { getFirestore, doc, updateDoc,collection,addDoc,getDocs } from "firebase/firestore";
import fs from "fs";

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

const VAT_RATE = 0.15;

async function createOrders() {
  try {
    // Step 1: Fetch customers from the 'users' collection
    const usersSnapshot = await getDocs(collection(db, "users"));
    const customers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Step 2: Fetch artworks from the 'Market' collection
    const artworkSnapshot = await getDocs(collection(db, "Market"));
    let artworks = artworkSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    for (const customer of customers) {
      if (artworks.length === 0) break; // Stop if no more artwork is left

      // Randomly select artworks for this order (example: 1-3 items)
      const numItems = Math.floor(Math.random() * 3) + 1;
      const items = artworks.splice(0, numItems);

      // Calculate subtotal, VAT amount, and total
      const subtotal = items.reduce((acc, item) => acc + item.price, 0);
      const VAT_amount = VAT_RATE * subtotal;
      const total = subtotal + VAT_amount;

      // Create order data
      const orderData = {
        customerID: customer.id,
        customer_address: customer.delivery_address || {}, // Use customer's address if available
        customer_contact: {
          name: customer.fullName,
          mobile_number: customer.contactNumber || "",
          email: customer.email
        },
        items,
        dateOfPurchase: new Date().toISOString(),
        subtotal:subtotal,
        VAT: VAT_RATE,
        VAT_amount:VAT_amount,
        total:total,
        deliveryStatus: "Processed",
        special_instructions_delivery: "This is a test shipment - DO NOT DELIVER"
      };

      // Add order to 'orders' collection
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      const orderID = orderRef.id;

      // Update each artwork item with the order ID
      for (const item of items) {
        await updateDoc(doc(db, "Market", item.id), { orderID });
      }
      console.log(`Order created with ID: ${orderID}`);
    }
  } catch (error) {
    console.error("Error creating orders:", error);
  }
}

//createOrders();


export async function exportOrdersToJSON() {
  try {
    // Step 1: Retrieve all documents from the 'orders' collection
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id, // Include the document ID
      ...doc.data() // Include the rest of the document data
    }));

    // Step 2: Convert the orders to JSON format
    const jsonContent = JSON.stringify(orders, null, 2);

    // Step 3: Create a Blob and trigger a download
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders.json";
    link.click();

    console.log("Orders have been successfully exported as 'orders.json'.");
  } catch (error) {
    console.error("Error exporting orders to JSON:", error);
  }
}

// Call the function to export orders
// exportOrdersToJSON();