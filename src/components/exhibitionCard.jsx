import React, { useState } from "react";
import Modal from "./modal";
import { getRandomBoolean, toTitleCase } from "../utils/utils";
import { updateRecord } from "../firebase/firebaseMethods";
import "@fontsource/inter";
import { CgUnavailable } from "react-icons/cg";
import { FaRegCircleCheck } from "react-icons/fa6";
import EllipsisText from "./ellipsisText";

export default function ExibitionCard({ data, reload, setReload, collection }) {
  //console.log("Rendered Market")
  // Initialize isApproved based on the isEnabled property
  const [isVisible, setIsVisible] = useState(false);

  //console.log("The value of data: ", data);
  const [status, setStatus] = useState(data.isEnabled ? "Approved" : "Decline");

  // Find the image URL with default: true
  const defaultImageUrl = data.imgUrls.find((img) => img.default)?.imgUrl;

  const handleApprove = () => {
    // Add approval logic here
    updateRecord("exhibition", data.id, { isEnabled: true });
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
    <tr style={{ backgroundColor: "white", borderBottom: "1px solid #ddd",width:"100%" }}>
      <td style={{ padding: "12px" }}>
        {" "}
        {/* Image cell */}
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundImage: `url(${defaultImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            borderRadius: "100%",
          }}
        ></div>
      </td>
      <td style={{ padding: "12px" }}>
        {" "}
        {/* Details cell */}
        <div>
          <p className="w3-text-black">{toTitleCase(data.name)}</p>
        </div>
      </td>
      <td style={{ padding: "12px" }}>
        {" "}
        {/* Weight cell */}
        <div className="tooltip" style={{display:"flex",alignItems:"center"}}>
          <p className=" ellipsis-text" style={{color: "grey",}}>{data.address}</p>
          <span className="tooltiptext" style={{color: "white",}}>{data.address}</span>
        </div>
      </td>
      <td  style={{color: "grey",padding: "12px" }}>
      {new Date(
            data.date.fromDate.seconds * 1000 +
              data.date.fromDate.nanoseconds / 1000000
          ).toDateString()}
      </td>
      <td  style={{color: "grey",padding: "12px" }}>
      {new Date(
            data.date.toDate.seconds * 1000 +
              data.date.toDate.nanoseconds / 1000000
          ).toDateString()}
      </td>

      <td colSpan="2"  style={{ padding: "12px" }}>

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
