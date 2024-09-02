import React, { useState } from "react";
import Modal from "./modal";
import { updateRecord } from "../firebase/firebaseMethods";
import EllipsisText from "./ellipsisText";

export default function ExhibitionCard({ exhibit }) {
  // Initialize isApproved based on the isEnabled property
  const [isVisible, setIsVisible] = useState(false);

  const [status, setStatus] = useState(
    exhibit.isEnabled ? "Approved" : "Decline"
  );
  // Find the image URL with default: true
  const defaultImageUrl = exhibit.imgUrls.find((img) => img.default)?.imgUrl;
  //console.log("The value of isEnabled: ",exhibit.date.fromDate.seconds);
  const handleApprove = () => {
    updateRecord(
      "exhibition",
      artist.id,
      { isEnabled: true },
      reload,
      setReload
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
    <div
      className="w3-card-4 w3-margin w3-white w3-round"
      style={{
        backgroundImage: `url(${defaultImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "400px",
      }}
    >
      <Modal visible={isVisible} close={setIsVisible} />
      <div
        className="w3-display-container"
        style={{ height: "20vh", padding: "2%" }}
      ></div>

      <div
        className="w3-container w3-round"
        style={{
          padding: "2%",

          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: `blur(2px)`,
        }}
      >
        <div class="tooltip">
          <h3 className="w3-text-black ellipsis-text">{exhibit.address}</h3>
          <span class="tooltiptext">{exhibit.address}</span>
        </div>
        <p className="w3-text-black">
          <strong>Start Date:</strong>{" "}
          {new Date(
            exhibit.date.fromDate.seconds * 1000 +
              exhibit.date.fromDate.nanoseconds / 1000000
          ).toDateString()}
          <br></br>
          <strong>End Date:</strong>{" "}
          {new Date(
            exhibit.date.toDate.seconds * 1000 +
              exhibit.date.toDate.nanoseconds / 1000000
          ).toDateString()}
        </p>
        <br></br>
        {/* Dropdown for status */}
        <select
          id="status-select"
          className="w3-select w3-border w3-round"
          value={exhibit.isEnabled ? "Approved" : "Decline"}
          onChange={handleStatusChange}
          style={{
            width: "100%",
            paddingLeft: "2%",
            paddingRight: "2%",
            backgroundColor: exhibit.isEnabled ? "#51a3a3" : "#FF3636",
            color: "white",
          }}
        >
          <option value="Approved">Approved</option>
          <option value="Decline">Decline</option>
        </select>
      </div>
    </div>
  );
}
