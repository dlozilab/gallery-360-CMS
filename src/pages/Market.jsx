import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import ArtworkCard from "../components/artworkCard";
import '@fontsource/inter';

export default function Market() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  console.log("Rendered Market");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "Market"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reload]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "95vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <h2 style={{fontWeight: "bold",fontSize:30 }}>Market</h2>
      </div>

      {data.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "20px 0",
            fontSize: "16px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left",backgroundColor: "#f2f2f2" }}>
              <th style={{ textAlign: "left",paddingLeft: "12px",paddingTop: "12px",paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>Artwork</th>
              <th style={{ textAlign: "left",paddingTop: "12px",paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>Details</th>
              <th style={{ textAlign: "left",paddingTop: "12px",paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>Price</th>
              <th style={{ textAlign: "left",paddingTop: "12px",paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>Availability</th>
              <th style={{ textAlign: "left",paddingTop: "12px",paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>Visibility</th>
              <th style={{ textAlign: "left",paddingTop: "12px",paddingBottom: "12px", borderBottom: "1px solid #ddd" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <ArtworkCard
                key={item.id}
                data={item}
                reload={reload}
                setReload={setReload}
                collection={collection}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={require("../assets/Spinner@1x-1.0s-200px-200px (1).gif")}
            alt="Loading content..."
          />
        </div>
      )}
    </main>
  );
}
