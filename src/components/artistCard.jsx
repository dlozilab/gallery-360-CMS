import React, { useState } from "react";
import Modal from "./modal";
import { toTitleCase } from "../utils/utils";
import { IoIosGlobe, IoIosPhonePortrait } from "react-icons/io";
import { updateRecord } from "../firebase/firebaseMethods";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist, reload, setReload }) {
  //console.log("the artist: ", artist);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(
    artist.isEnabled ? "Approved" : "Decline"
  );

  const handleApprove = () => {
    // Add approval logic here
    updateRecord("Market", artist.id, { isEnabled: true }, reload, setReload);
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
      className="w3-card-4 w3-margin w3-white w3-round-large"
      style={{ display: "flex",width:"350px"}}
    >
      <Modal
        visible={isVisible}
        close={() => setIsVisible(false)}
        recordID={artist.id}
        reload={reload}
        setReload={setReload}
        collection={"Market"}
      />
      <div
        style={{
          backgroundImage: `url(${
            artist.photoUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "60%",
        }}
      ></div>
      {/* artist Profile Picture */}

      <div style={{ textAlign: "left",padding:"2%"}}>
        <h3 className="w3-text-black">{toTitleCase(artist.artistName)}</h3>
        <p>
          <IoIosPhonePortrait /> {artist.contactnumber}
          <br></br>
          <IoIosGlobe /> <a href={artist.websiteurl}>{artist.websiteurl}</a>
        </p>
        <p>
          <Link
            to={`${artist.id}`}
            state={artist}
            className="w3-button w3-padding-large w3-white w3-border"
          >
            <b>View full profile»</b>
          </Link>
        </p>

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
  );
}
