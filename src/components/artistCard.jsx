import React, { useState } from "react";
import Modal from "./modal";
import { toTitleCase } from "../utils/utils";
import { IoIosGlobe, IoIosPhonePortrait } from "react-icons/io";

export default function ArtistCard({ artist }) {
  console.log("the artist: ", artist);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(
    artist.isEnabled ? "Approved" : "Decline"
  );

  const handleApprove = () => {
    // Add approval logic here
  };

  const handleDecline = () => {
    setIsVisible(true);
  };

  const handleStatusChange = (event) => {
    if (event.target.value === "Approved") {
      handleApprove();
    }
    if (event.target.value === "Decline") {
      handleDecline();
    }
    setStatus(event.target.value);
  };

  return (
    <div
      className="w3-card-4 w3-margin w3-white w3-round"
      style={{
        width: "30%",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Modal visible={isVisible} close={() => setIsVisible(false)} />

      {/* artist Profile Picture */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <div
            style={{
              backgroundImage: `url(${artist.photoUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          ></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="w3-text-black">{toTitleCase(artist.artistName)}</h3>
          <span>
            <IoIosPhonePortrait /> {artist.contactnumber} | <IoIosGlobe />{" "}
            <a href={artist.websiteurl}>{artist.websiteurl}</a>
          </span>
          <br></br>
          <p>Bio: {artist.biography}</p>

          {/* Approval/Decline Dropdown */}
          <select
            id="status-select"
            className="w3-select w3-border w3-round"
            value={status}
            onChange={handleStatusChange}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: status === "Approved" ? "#51a3a3" : "#FF3636",
              color: "white",
              cursor: "pointer",
            }}
          >
            <option value="Approved">Approved</option>
            <option value="Decline">Decline</option>
          </select>
        </div>
      </div>
      <video width="100" controls>
        <source src={artist.videoUrl} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
  );
}
