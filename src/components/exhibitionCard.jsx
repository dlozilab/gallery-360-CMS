import React, { useState } from "react";
import Modal from "./modal";

export default function ExhibitionCard({ artwork }){
  // Initialize isApproved based on the isEnabled property
  const [isVisible, setIsVisible] = useState(false);

  const [status, setStatus] = useState(
    artwork.isEnabled ? "Approved" : "Decline"
  );
  // Find the image URL with default: true
  const defaultImageUrl = artwork.imgUrls.find((img) => img.default)?.imgUrl;
  console.log("The value of isEnabled: ",artwork.date.fromDate.seconds);
  const handleApprove = () => {

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
        width: "20%",
        height: "100%",
      }}
    >
      <Modal visible={isVisible} close={setIsVisible} />
      <div
        className="w3-display-container"
        style={{ height: "50%", padding: "2%" }}
      ></div>

      <div
        className="w3-container w3-round"
        style={{
          height: "50%",
          padding: "5%",
          bottom: "0",
          background: "rgba(255, 255, 255, 0.8)",

          marginTop: "45%",
          backdropFilter: `blur(2px)`,
        }}
      >
        <h3 className="w3-text-black">{artwork.address}</h3>
        <p className="w3-text-black">
          <em>Start Date:</em> {new Date(artwork.date.fromDate.seconds * 1000 + artwork.date.fromDate.nanoseconds / 1000000).toDateString()}<br></br>
          <em>End Date:</em> {new Date(artwork.date.toDate.seconds * 1000 + artwork.date.toDate.nanoseconds / 1000000).toDateString()}
        </p>
        {/* Dropdown for status */}
        <select
          id="status-select"
          className="w3-select w3-border w3-round"
          value={artwork.isEnabled ? "Approved" : "Decline"}
          onChange={handleStatusChange}
          style={{ width: "100%",paddingLeft:"2%",paddingRight:"2%", backgroundColor:artwork.isEnabled?"#51a3a3":"#FF3636", color:"white"}}
        >
          <option value="Approved" >Approved</option>
          <option value="Decline">Decline</option>
        </select>
      </div>
    </div>
  );
};


