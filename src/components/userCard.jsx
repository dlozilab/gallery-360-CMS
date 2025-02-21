import React, { useState } from "react";
import Modal from "./modal";
import { getRandomBoolean, toTitleCase } from "../utils/utils";
import { updateRecord } from "../firebase/firebaseMethods";
import "@fontsource/inter";
import { CgUnavailable } from "react-icons/cg";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function UserCard({ data, reload, setReload, collection }) {
  //console.log("Rendered Market")
  // Initialize isApproved based on the isEnabled property
  const [isVisible, setIsVisible] = useState(false);

  //console.log("The value of user data: ",data);
  const [status, setStatus] = useState(data.isEnabled ? "Approved" : "Decline");

  // Find the image URL with default: true
  //const defaultImageUrl = data.imgUrls.find((img) => img.default)?.imgUrl;

  const handleApprove = () => {
    // Add approval logic here
    updateRecord("Market", data.id, { isEnabled: true });
    setReload(!reload);
    alert(
      `Record:${data.id} [from ${collection}] has been successfully updated!`
    );
  };

  const handleDecline = () => {
    setIsVisible(true);
  };

  // Update status based on dropdown selection
  const handleStatusChange = (event) => {
    if (event.target.value === "Approved") {
      handleApprove();
    }
    if (event.target.value === "Decline") {
      handleDecline();
    }
  };
  return (
    <tr style={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}>
      <td style={{ padding: "12px" }}>
        {" "}
        {/* Image cell */}
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundImage: `url(${data.photoURL || data.photoUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            borderRadius: "80%",
          }}
        ></div>
      </td>
      <td style={{ padding: "12px", fontSize:"14px" }}>
        {" "}
        {/* Details cell */}
        <div>
          <p className="w3-text-black">{toTitleCase(data.fullName)}</p>
        </div>
      </td>
      <td>
        {" "}
        {/* Weight cell */}
        <div style={{  padding: "12px",color: "grey", fontSize:"14px" }}>
          <p>
            <a href={`mailto:${data.email}`} style={{ color: "#682a17" }}>
              {data.email}
            </a>
          </p>
        </div>
      </td>
      <td style={{padding: "12px", fontSize:"14px"}}>
      {data.timeStamp &&
  new Date(data.timeStamp.seconds * 1000).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(",", "")}


      </td>

      <td style={{ padding: "12px", fontSize:"14px"}}>
        {" "}
        {/* Dropdown cell */}
        <select
          id="status-select"
          className="w3-select w3-round"
          value={data.isEnabled ? "Approved" : "Decline"}
          onChange={handleStatusChange}
          style={{
            width: "120px",
            paddingLeft: "2%",
            paddingRight: "5%",
             fontSize:"14px",
            backgroundColor: data.isEnabled ? "#dffeed" : "#ffd8db",
            color: data.isEnabled ? "#016d4b" : "#ff1821",
          }}
        >
          <option value="Approved">Approved</option>
          <option value="Decline">Decline</option>
        </select>
        <Modal
          visible={isVisible}
          close={setIsVisible}
          data={data}
          reload={reload}
          setReload={setReload}
          collection={collection}
        />
      </td>
    </tr>
  );
}
