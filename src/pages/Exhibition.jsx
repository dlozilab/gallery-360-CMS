import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import ExhibitionCard from "../components/exhibitionCard";

export default function Exhibition() {
  const [data, setData] = useState([]);

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
    <div style={{width:"100%",height:"100%"}}>
      <h1 className=" w3-margin">Exhibition</h1>
      <div style={{display:"flex",flexFlow:"row wrap"}}>
        {data.map((item) => (
          <ExhibitionCard key={item.id} artwork={item} />
        ))}
      </div>
    </div>
  );
}
