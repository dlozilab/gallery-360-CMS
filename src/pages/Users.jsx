import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import UserCard from "../components/userCard";

export default function Users() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
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
    <div style={{minHeight: "95vh"}}>
    {data.length > 0 ? (
      <div style={{ display: "flex", flexFlow: "row wrap" ,justifyContent:"center",alignItems:"center"}}>
        {data.map((item) => (
          <UserCard key={item.id} user={item} reload={reload} setReload={setReload} collection={"users"}/>
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
    </div>
  );
}
