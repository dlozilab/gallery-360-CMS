import React, { useState } from "react";
import Modal from "./modal";
import { toTitleCase } from "../utils/utils";
import { updateRecord } from "../firebase/firebaseMethods";

export default function UserCard({ user,reload,setReload,collection }) {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(user.isEnabled ? "Approved" : "Decline");

  const handleApprove = () => {
    // Add approval logic here
    updateRecord(collection, user.id, { isEnabled: true });
    setReload(!reload);
    alert(
      `Record:${user.id} [from ${collection}] has been successfully updated!`
    );
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
        width:"400px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Modal visible={isVisible} close={() => setIsVisible(false)} data={user} reload={reload} setReload={setReload} collection={collection}/>
      <h3 className="w3-text-black">{toTitleCase(user.fullName||user.fullname)}</h3>
      {/* User Profile Picture */}
      <div
        style={{
            backgroundImage: `url(${user.photoURL||user.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          margin: "0 auto",
        }}
      ></div>
      
      {/* User Email */}
      <p style={{ margin: "10px 0" }}>{user.email||user.websiteurl||"*No email saved*"}</p>
      
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
  );
}
