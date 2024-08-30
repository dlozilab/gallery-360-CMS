import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import UserCard from "../components/userCard";

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "users")
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
      <div style={{display:"flex",flexFlow:"row wrap"}}>
        {data.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>
    </div>
  );
}
