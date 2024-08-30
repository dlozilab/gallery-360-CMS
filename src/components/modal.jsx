import React from "react";

const Modal = ({ visible, close }) => {
  if (!visible) return null; // If the modal is not visible, return null
  const closeModal = () => close(false);
  return (
    <div className="w3-modal w3-round" style={{ display: visible ? "block" : "none" }}>
      <div className="w3-modal-content">
   
          <header className="w3-panel" style={{ width: "100%" ,display:"flex",justifyContent:"flex-end",padding:"2%"}}>
            <span
              onClick={closeModal}
              className="w3-button w3-border w3-border-black w3-round-large"
              style={{ cursor: "pointer" }}
            >
              &times;
            </span>
          </header>

          <div className="w3-container" style={{ width: "100%" }}>
            <textarea name="message" placeholder="Message" rows="5" cols="30"  style={{ width: "100%",padding:"2%" }}>
              
            </textarea>
            <span className="w3-text-red" >Reason for Not Displaying the Art on Market</span>
          </div>

          <footer
            className="w3-container"
            style={{ width: "100%", display:"flex",justifyContent:"flex-end",padding:"2%"}}
          >
            <button
              onClick={closeModal}
              className="w3-button w3-red w3-round-large"
              style={{ cursor: "pointer" }}
            >
              Decline
            </button>
          </footer>
        </div>

    </div>
  );
};

export default Modal;
