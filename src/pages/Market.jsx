import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import ArtworkCard from "../components/artworkCard";
import "@fontsource/inter";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export default function Market() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [numRows, setNumRows] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(numRows);

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

  const rowsPerPage = (event) => {
    setNumRows(event.target.value);
    setStartIndex(0);
    const value = parseInt(event.target.value);
    setEndIndex(value > data.length ? data.length : value);
  };

  const nextPage = () => {
    if (endIndex < data.length) {
      const newStartIndex = startIndex + numRows;
      const newEndIndex = Math.min(endIndex + numRows, data.length);

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  const prevPage = () => {
    if (startIndex > 0) {
      const newStartIndex = Math.max(startIndex - numRows, 0);
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
        padding: "2%",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <h2 style={{ fontWeight: "bold", fontSize: 30 }}>Market</h2>
      </div>

      {data.length > 0 ? (
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
            <tr style={{ backgroundColor: "#f9f9f9" }}>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Artwork
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Details
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Weight
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Price
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Availability
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "#555",
                }}
              >
                Visibility
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
              <ArtworkCard
                key={item.id}
                data={item}
                reload={reload}
                setReload={setReload}
                collection={"Market"}
              />
            ))}
          </tbody>
          <tfoot style={{ backgroundColor: "#f9f9f9" }}>
            <tr>
              <td style={{ padding: "12px" }}></td>
              <td style={{ padding: "12px" }}></td>
              <td style={{ padding: "12px" }}></td>
              <td style={{ padding: "12px", color: "#555" }}>Rows per page</td>
              <td style={{ padding: "12px" }}>
                <select
                  id="rowsPerPage"
                  value={numRows}
                  onChange={rowsPerPage}
                  style={{
                    color: "#555",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "4px",
                    fontSize: "16px",
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
              <td style={{ padding: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <span
                  onClick={prevPage}
                  style={{
                    color: "#555",
                    fontSize: "20px",
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
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  <IoIosArrowDropright size={25} />
                </span>
              </td>
            </tr>
          </tfoot>
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
