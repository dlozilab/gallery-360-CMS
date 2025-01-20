import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const BioModal = ({ visible, close, data, reload, setReload, collection }) => {
  //console.log("data: ", data);
  if (!visible) return null; // If the modal is not visible, return null

  const closeModal = () => {
    //console.log("openBio1: ",visible)
    close(false);
    //console.log("openBio2: ",visible)
  };

  return (
    <div
      className="w3-modal w3-round"
      style={{
        display: visible ? "inline-block" : "none",
        borderRadius: "20px",
      }}
    >
      <div className="w3-modal-content w3-round-large">
        <header
          style={{
            padding: "2%",
            backgroundColor: "#682a17",
            marginBottom: "2%",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span className="w3-text-white w3-xlarge">
              {data.fullName || data.fullname}
            </span>
            <span
              onClick={closeModal}
              className="w3-button w3-border w3-border-white w3-round-large"
              style={{ cursor: "pointer", color: "white" }}
            >
              &times;
            </span>
          </div>
          <p style={{ color: "#CEB89E" }}>
            {data.contactnumber || data.contactNumber}  {data.websiteUrl && "| "+data.websiteUrl}
          </p>
        </header>
        <div
          style={{
            display: "flex",
            padding: "2%",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundImage: `url(${data.photoUrl || data.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              marginRight: "5%",
              borderRadius: "100%",
            }}
          ></div>
          <div>
            <div>{data.biography}</div>
            <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "2%",
            alignItems: "center",
            marginTop:"15%",
           // marginBottom:"15%",
            
            
          }}
        >
          <a href={data.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} style={{ color: "#484a4c" }} />
          </a>
          <a href={data.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} style={{ color: "#484a4c" }} />
          </a>
        </div>
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

        
      </div>
    </div>
  );
};

export default BioModal;
