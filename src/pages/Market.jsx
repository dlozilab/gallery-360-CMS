import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import ArtworkCard from "../components/artworkCard";
import "@fontsource/inter";

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
    //console.log("DataRows: ", numRows);
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
        padding: "2%",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
      >
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
          }}
        >
          <thead
            style={{
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            <tr style={{ textAlign: "left", backgroundColor: "white" }}>
              <th
                style={{
                  textAlign: "left",
                  paddingLeft: "12px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "grey",
                }}
              >
                Artwork
              </th>
              <th
                style={{
                  textAlign: "left",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "grey",
                }}
              >
                Details
              </th>
              <th
                style={{
                  textAlign: "left",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "grey",
                }}
              >
                Weight
              </th>
              <th
                style={{
                  textAlign: "left",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "grey",
                }}
              >
                Price
              </th>
              <th
                style={{
                  textAlign: "left",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "grey",
                }}
              >
                Availability
              </th>
              <th
                style={{
                  textAlign: "left",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "grey",
                }}
              >
                Visibility
              </th>
              <th
                style={{
                  textAlign: "left",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #ddd",
                  color: "grey",
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
                collection={collection}
              />
            ))}
          </tbody>
          <tfoot style={{ backgroundColor: "white" }}>
            <tr>
              <td style={{ padding: "12px" }}>
                <p> </p>
              </td>
              <td>
                <p> </p>
              </td>
              <td>
                <p> </p>
              </td>
              <td>
                <p style={{color: "grey",}}>Rows per page </p>
              </td>
              <td style={{ padding: "12px" }}>
                <p>
                  <select
                    id="rowsPerPage"
                    value={numRows}
                    onChange={rowsPerPage}
                    style={{ color: "grey",borderStyle: "none" }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>{" "}
                </p>
              </td>

              <td>
                <p style={{color: "grey",}}>{startIndex+1} - {endIndex} of {data.length}</p>
              </td>
              <td style={{ padding: "12px" }}>
                <p>
                  <span
                    onClick={prevPage}
                    style={{color: "grey",
                      fontSize: 25,
                      marginRight: "25%",
                      cursor: "pointer",
                    }}
                  >
                    &lt;
                  </span>
                  <span
                    onClick={nextPage}
                    style={{ color: "grey",fontSize: 25, cursor: "pointer" }}
                  >
                    &gt;
                  </span>
                </p>
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
