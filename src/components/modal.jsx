import React, { useState } from "react";
import { updateRecord } from "../firebase/firebaseMethods";

const Modal = ({ visible, close,data,reload,setReload,collection }) => {
  if (!visible) return null; // If the modal is not visible, return null

  const [message,setMessage] = useState("")

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  };

  const handleDecline = () => {
    updateRecord(collection,data.id,{isEnabled:false});
    updateRecord(collection,data.id,{declineReason:message});
    alert(
      `Record:${data.id} [from ${collection}] has been successfully updated!`
    );
    setReload(!reload)
    close(false);
  };

  const closeModal = () => close(false);
  
  return (
    <div className="w3-modal w3-round" style={{ display: visible ? "block" : "none" }}>
      <div className="w3-modal-content w3-round-large">
   
          <header style={{ width: "100%" ,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"2%",backgroundColor:"#ad0403",marginBottom:"2%"}}>
          <span className="w3-text-white w3-xlarge" >Please provide a reason for the decline</span>
            <span
              onClick={closeModal}
              className="w3-button w3-border w3-border-white w3-round-large"
              style={{ cursor: "pointer",color:"white" }}
            >
              &times;
            </span>
          </header>

          <div className="w3-container" style={{ width: "100%" }}>
         
            <textarea name="message" placeholder="Message" rows="5" cols="30"  style={{ width: "100%",padding:"2%" }} value={message} onChange={handleMessageChange}>
              
            </textarea>
            
          </div>

          <footer
            className="w3-container"
            style={{ width: "100%", display:"flex",padding:"2%"}}
          >
            <button
              onClick={handleDecline}
              className="w3-button w3-round-large"
              style={{ cursor: "pointer",backgroundColor:"#ad0403",color:"white" }}
            >
              Send
            </button>
          </footer>
        </div>

    </div>
  );
};

export default Modal;
