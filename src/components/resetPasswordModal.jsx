import React, { useState } from "react";
import { isValidEmail } from "../utils/utils";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const auth = getAuth();

  const [emailAccount, setEmailAccount] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [done, setDone] = useState(false);
  //alert(isOpen);

  // const handleReset = async () => {
  //   if (isValidEmail(emailAccount)) {
  //     try {
  //       await sendPasswordResetEmail(auth, emailAccount);
  //     } catch (error) {
  //       if (error.code === "auth/user-not-found") {
  //         alert("This email does not have access to the CMS.");
  //         onClose(false);
  //         return;
  //       } else {
  //         alert(error.code);
  //         return;
  //       }
  //     }
  //     setDone(true);
  //     return;
  //   }
  //   setDone(false);
  //   setWrongEmail(true);
  // };

  const handleReset = async () => {
    if (isValidEmail(emailAccount)) {
      try {
        await sendPasswordResetEmail(auth, emailAccount);
        setDone(true);
        return; // Return after setting done to true
      } catch (error) {
        // ... error handling ...
      }
    }
    setDone(false);
    setWrongEmail(true);
  };

  const handleEmail = (event) => {
    setEmailAccount(event.target.value);
    setWrongEmail(false);
  };

  return (
    <div
      className={`w3-modal w3-round-large`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="w3-modal-content w3-card-4 w3-round-large">
        <div
          className="w3-round-large"
          style={{ display: done ? "none" : "inline-block" }}
        >
          <header className="w3-container" style={{}}>
            <span
              onClick={() => onClose()}
              className="w3-button w3-display-topright w3-text-white"
            >
              &times;
            </span>
            <h2>Reset Password</h2>
          </header>
          <div className="w3-container">
            <p>Enter your email to reset your password:</p>
            <input
              type="email"
              className="w3-input w3-border"
              placeholder="Enter your email"
              value={emailAccount}
              onChange={handleEmail}
            />
            <p
              style={{
                display: wrongEmail ? "inline-block" : "none",
                color: "#ad0403",
              }}
            >
              Please provide a valid email.
            </p>
            <br></br>
            <br></br>
            <button
              className="w3-button w3-teal w3-margin-bottom"
              onClick={handleReset}
            >
              Reset
            </button>
            <br></br>
          </div>
        </div>

        <div
          className="w3-container w3-round-large"
          style={{
            backgroundColor: "#ceb79e",
            display: done ? "inline-block" : "none",
          }}
        >
          <h3>Reset password email sent. </h3>
          <p>from Firebase</p>
          <br></br>
          <button
            className="w3-button w3-teal w3-margin-bottom"
            onClick={onClose}
          >
            Done
          </button>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
