import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import UserCard from "../components/userCard";
import "@fontsource/inter";
import { IoIosArrowDropleft,IoIosArrowDropright } from "react-icons/io";
import Preloader from "../components/preloader";
import { FaRegUser } from "react-icons/fa";

export default function Users() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [numRows, setNumRows] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numRows);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Create a new array with converted timestamps
        const itemsWithDate = items.map((item) => ({
          ...item,
          date: item.timeStamp ? new Date(item.timeStamp.seconds * 1000) : null, // Convert seconds to Date
        }));

        // Sort by date (newest first)
        itemsWithDate.sort(
          (a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
        );
        //console.log("itemsWithDate: ", itemsWithDate);
        setData(itemsWithDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reload]);

  const rowsPerPage = async (event) => {
    setNumRows(event.target.value);
    setStartIndex(0);
    if (event.target.value > data.length) {
      setEndIndex(data.length);
    }
    if (event.target.value < data.length) {
      setEndIndex(event.target.value);
    }
  };

  const nextPage = () => {
    if (endIndex < data.length) {
      const newStartIndex = startIndex + numRows;
      const newEndIndex = endIndex + numRows > data.length ? data.length : endIndex + numRows;

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  const prevPage = () => {
    if (startIndex > 0) {
      const newStartIndex = startIndex - numRows < 0 ? 0 : startIndex - numRows;
      const newEndIndex = newStartIndex + numRows;

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "95vh",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f2f2f2",
      }}
    >{data.length > 0 ? (<> 
      <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#3f1505",
                    padding: "2%",
                    borderBottom:"2px solid #3f1505",

                  }}
                >
                  <FaRegUser size={30} />
                  <span
                    style={{ fontWeight: "bold", fontSize: 30, marginLeft: "10px" }}
                  >
                    Users
                  </span>
                </div>

      
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "20px 0",
            fontSize: "16px",
            textAlign: "left",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#F9F9F9" }}>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Joined
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(startIndex, endIndex).map((item) => (
              <UserCard
                key={item.id}
                data={item}
                reload={reload}
                setReload={setReload}
                collection={"users"}
              />
            ))}
          </tbody>
          <tfoot style={{ backgroundColor: "#F9F9F9" }}>
            <tr>
            <td style={{ padding: "12px", color: "#555", textAlign: "right" }}>
                
              </td>
              <td style={{ padding: "12px", color: "#555", textAlign: "right" }}>
                
              </td>
              <td style={{ padding: "12px" }}>Rows per page
                <select
                  id="rowsPerPage"
                  value={numRows}
                  onChange={rowsPerPage}
                  style={{
                    color: "#555",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "4px",
                    fontSize: "16px",marginLeft:"10px"
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </td>
              <td style={{ padding: "12px", color: "#555" }}>
                {startIndex + 1} - {endIndex} of {data.length}
              </td>
              <td style={{ padding: "12px", display: "flex", justifyContent: "center",alignItems:"center" }}>
                    <span
                      onClick={prevPage}
                      style={{
                        color: "#555",
                        fontSize: "12px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <IoIosArrowDropleft size={25} />
                    </span>
                    <span
                      onClick={nextPage}
                      style={{
                        color: "#555",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                     <IoIosArrowDropright size={25}/>
                    </span>
                  </td>
            </tr>
          </tfoot>
        </table></>
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
          <Preloader/>
        </div>
      )}
    </main>
  );
}
