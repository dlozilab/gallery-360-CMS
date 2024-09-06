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

const auth = getAuth(FIREBASE_APP);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCredentials, setErrorCredentials] = useState(0);
  //0 = all good, 1 = email is invalid, 2 = password is invalid, 3 = system says wrong credentials

  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('market');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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
    <div style={{ display: "flex" }}>
      <ResetPasswordModal isOpen={resetPassword} onClose={closeModal} userEmail={email}/>
      <div
        style={{
          display: "flex",
          width: "65%",
          minHeight: "100vh",
          backgroundImage: `url(${require("../assets/signin.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={require("../assets/Gallery-360-cms-removebg-preview.png")}
          alt="gallery 360 logo"
          style={{ width: "40%" }}
        />
        <h1>
          <span
            className="w3-serif"
            style={{ fontWeight: "800", fontSize: 50 }}
          >
            Gallery 360{" "}
          </span>
          <span style={{ fontWeight: "300", fontSize: 50 }}>Africa</span>
        </h1>
      </div>
      <div
        style={{
          width: "35%",
          minHeight: "100vh",
          backgroundImage: "linear-gradient(180deg, #ceb79e, #616161)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1 className="w3-text-white w3-serif" style={{ fontSize: 100 }}>
            Sign In
          </h1>
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
                color: "white",
              }}
            />
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
            onClick={openModal}
          >
            <a href="" className="w3-text-black">
              Forgot password?
            </a>
          </div>
          <br></br>
          <p>
            <button
              className="w3-btn w3-border w3-border-black w3-round w3-text-black"
              style={{ width: "100%", textAlign: "left" }}
              onClick={handleSubmit}
            >
              SIGN IN
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
    </div>
  );
};

export default SignIn;
