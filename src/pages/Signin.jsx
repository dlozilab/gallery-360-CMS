import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FIREBASE_APP } from "../firebase/firebase.config";
import { isValidEmail, validatePassword } from "../utils/utils";
import ResetPasswordModal from "../components/resetPasswordModal";
import PreloaderModal from "../components/preloaderModal";

const SignIn = () => {
  const auth = getAuth(FIREBASE_APP);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCredentials, setErrorCredentials] = useState(0);
  //0 = all good, 1 = email is invalid, 2 = password is invalid, 3 = system says wrong credentials

  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setVisible(true);
        //alert(visible)
        navigate("/market");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    setErrorCredentials(0);

    if (!isValidEmail(email)) {
      setErrorCredentials(1);
      return;
    }

    if (!validatePassword(password)) {
      setErrorCredentials(2);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorCredentials(3);
      } else {
        alert(error.code);
      }
    }
  };

  const openModal = () => {
    setResetPassword(true);
  };
  const closeModal = () => {
    setResetPassword(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorCredentials(0);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorCredentials(0);
  };

  return (
    <div
      style={{
        display: "flex",
        // minHeight: "10vh",
        
        backgroundImage: `url(${require("../assets/marek-piwnicki-IOecrEHYXHY-unsplash.jpg")})`,
        backgroundPosition: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResetPasswordModal
        isOpen={resetPassword}
        onClose={() => setResetPassword(false)}
      />
      <PreloaderModal visible={visible} onClose={() => setVisible(false)} />

      <div
        className="w3-card-4 w3-round-large"
        style={{
          padding: "3%",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={require("../assets/Gallery-360-cms-removebg-preview.png")}
            alt="gallery 360 logo"
            style={{ width: "40%" }}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#3c1704",
          }}
        >
          <h1 className="w3-monospace" style={{ fontSize: 70 }}>
            Sign In
          </h1>
          <p>Please use your email to gain access to the Gallery 360 CMS</p>
        </div>
        <br></br>
        <p
          style={{
            color: "#ad0403",
            display: errorCredentials !== 3 ? "none" : "inline-block",
          }}
        >
          Incorrect Credentials. Try again.
        </p>
        <p>
          <label className="w3-text-white">Email</label>
          <input
            className="w3-input w3-border w3-border-white w3-round"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={{
              backgroundColor: "transparent",
              width: "100%",
              color: "white",
            }}
          />
        </p>
        <p
          style={{
            color: "#ad0403",
            display: errorCredentials !== 1 ? "none" : "inline-block",
          }}
        >
          Please provide a valid email address
        </p>
        <br></br>
        <p>
          <label className="w3-text-white">Password</label>
          <input
            className="w3-input w3-border w3-border-white w3-round"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              backgroundColor: "transparent",
              width: "100%",
              color: "white",marginBottom: "2%",
            }}
          />
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            
          }}
          onClick={() => setResetPassword(true)}
        >
          <span
            className="w3-border-bottom w3-border-black"
            style={{ cursor: "pointer", color: "#3c1704" }}
          >
            Forgot password?
          </span>
        </div>
        <br></br>
        <p>
          <button
            className="w3-btn w3-round w3-text-white"
            style={{ width: "100%", backgroundColor: "#3c1704" }}
            onClick={handleSubmit}
          >
            Get Started
          </button>
        </p>
        <br></br>
        <br></br>
        <p
          style={{
            color: "#ad0403",
            display: errorCredentials !== 2 ? "none" : "inline-block",
          }}
        >
          Must have at least one special characters<br></br>
          Must have at least one digit<br></br>
          Must have at least one uppercase letter<br></br>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
