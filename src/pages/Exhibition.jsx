import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import ExhibitionCard from "../components/exhibitionCard";

export default function Exhibition() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "exhibition")
        );
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
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            width: "100%",
            minHeight: "95vh",
          }}
        >
          {data.map((item) => (
            <ExhibitionCard key={item.id} artwork={item} />
          ))}
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            minHeight: "95vh",
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
    </>
  );
}
