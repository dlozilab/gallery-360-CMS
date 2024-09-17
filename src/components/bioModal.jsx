import React from "react";

const BioModal = ({ visible, close, data, reload, setReload, collection }) => {
  if (!visible) return null; // If the modal is not visible, return null

  const closeModal = () => {
    //console.log("openBio1: ",visible)
    close(false)
    //console.log("openBio2: ",visible)
  };

  return (
    <div
      className="w3-modal w3-round"
      style={{ display: visible ? "inline-block" : "none" }}
    >
      <div className="w3-modal-content w3-round-large">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2%",
            backgroundColor: "#CEB89E",
            marginBottom: "2%",
          }}
        >
          <span className="w3-text-white w3-xlarge">{data.artistName}</span>
          <span
            onClick={closeModal}
            className="w3-button w3-border w3-border-white w3-round-large"
            style={{ cursor: "pointer", color: "white" }}
          >
            &times;
          </span>
        </header>
        <p style={{ padding: "2%" }}>{data.biography}</p>

        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundImage: `url(${data.signature})`,
            backgroundSize: "cover",
            backgroundPosition: "center",

          }}
        ></div>
      </div>
    </div>
  );
};

export default BioModal;
