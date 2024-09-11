import React, { useState } from "react";
import Modal from "./modal";
import IsArtHidden from "./isArtHidden";
import { getRandomBoolean } from "../utils/utils";
import { updateRecord } from "../firebase/firebaseMethods";
import '@fontsource/inter';


export default function ArtworkCard({ data, reload, setReload, collection }) {
  console.log("Rendered Market")
  // Initialize isApproved based on the isEnabled property
  const [isVisible, setIsVisible] = useState(false);

  //console.log("The value of isEnabled: ",data);
  const [status, setStatus] = useState(data.isEnabled ? "Approved" : "Decline");
  
  // Find the image URL with default: true
  const defaultImageUrl = data.imgUrls.find((img) => img.default)?.imgUrl;

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
    <div
      className="w3-card-4 w3-margin w3-white w3-round"
      style={{
        backgroundImage: `url(${defaultImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "400px",
      }}
    >
      <Modal
        visible={isVisible}
        close={setIsVisible}
        data={data}
        reload={reload}
        setReload={setReload}
        collection={collection}
      />
      <div
        className="w3-display-container"
        style={{
          height: "50%",
          padding: "2%",
          display: "flex",
          justifyContent: "flex-end",
        }}
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
        <h3 className="w3-text-black">{data.title}</h3>
        <p className="w3-text-black">
          Dimensions: {data.dimensions.height} x {data.dimensions.width} x{" "}
          {data.dimensions.length} cm
          <br></br>
          Price: R{data.price}
          <br></br>
          {data.isAvailable ? (
            <span style={{ color: "green", fontSize: 15 }}>✔︎</span>
          ) : (
            <span style={{ color: "red", fontSize: 15 }}>✗</span>
          )}{" "}
          Available <br></br>
          {getRandomBoolean() ? (
            <span style={{ color: "green", fontSize: 15 }}>✔︎</span>
          ) : (
            <span style={{ color: "red", fontSize: 15 }}>✗</span>
          )}{" "}
          Visible<br></br>
        </p>
        {/* Dropdown for status */}
        <select
          id="status-select"
          className="w3-select w3-border w3-round"
          value={data.isEnabled ? "Approved" : "Decline"}
          onChange={handleStatusChange}
          style={{
            width: "100%",
            paddingLeft: "2%",
            paddingRight: "2%",
            backgroundColor: data.isEnabled ? "#51a3a3" : "#FF3636",
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
