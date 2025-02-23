import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import ArtworkCard from "../components/artworkCard";
import "@fontsource/inter";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Preloader from "../components/preloader";
import { SiMarketo } from "react-icons/si";

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
        //console.log("items: ",items)
        setData(items);
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
      const newEndIndex =
        endIndex + numRows > data.length ? data.length : endIndex + numRows;

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
    >
      {data.length > 0 ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3f1505",
              padding: "2%",
              borderBottom: "2px solid #3f1505",
            }}
          >
            <SiMarketo size={30} />
            <span
              style={{ fontWeight: "bold", fontSize: 30, marginLeft: "10px" }}
            >
              Market
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
                ></th>
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
            <tfoot style={{ backgroundColor: "#F9F9F9" }}>
            <tr style={{width:"100%"}}>

              <td style={{ padding: "12px", color: "#555"}} colSpan={7}>

                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span>
                Rows per page

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
                    marginLeft:"10px",
                    marginRight:"20px"
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                </span>
                {startIndex + 1} - {endIndex} of {data.length}
                <span >
                    <span
                      onClick={prevPage}
                      style={{
                        color: "#555",
                        fontSize: "12px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      className="w3-hover-opacity"
                    >
                      <IoIosArrowDropleft size={30} />
                    </span>
                    <span
                      onClick={nextPage}
                      style={{
                        color: "#555",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                      className="w3-hover-opacity"
                    >
                     <IoIosArrowDropright size={30}/>
                    </span>
                </span>
              </div>
              </td>
            </tr>
          </tfoot>
          </table>
        </>
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
          <Preloader />
        </div>
      )}
    </main>
  );
}
