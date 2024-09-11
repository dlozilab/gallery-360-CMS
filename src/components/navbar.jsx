import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "@fontsource/inter";
import { SiMarketo } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { BsEasel } from "react-icons/bs";
import { MdOutlineColorLens } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  let currentPage = useLocation();
  let mark,
    exhibit,
    users,
    artist,
    orders = null;

  if (currentPage.pathname === "/market") mark = "#CEB89E";
  if (currentPage.pathname === "/exhibition") exhibit = "#CEB89E";
  if (currentPage.pathname === "/users") users = "#CEB89E";
  if (currentPage.pathname === "/artist") artist = "#CEB89E";
  if (currentPage.pathname === "/orders") orders = "#CEB89E";

  //console.log("Current page: ",currentPage)
  return (
    <nav
      className="w3-bar w3-border w3-light-grey w3-padding"
      style={{ display: "flex", flexDirection: "column", width: "350px" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"30%",
          marginBottom:"30%"
        }}
      >
        <img
          src={require("../assets/Gallery-360-cms-removebg-preview.png")}
          alt="gallery 360 logo"
          style={{ width: "80%" }}
        />
        <p style={{ fontWeight: "bold",fontSize:30 }}>Gallery 360</p>
      </div>

      <Link
        to="market"
        className="w3-bar-item w3-button w3-round-large"
        style={{ backgroundColor: mark, textAlign:"left",display:"flex",alignItems:"center" }}
      >
        <SiMarketo /> <span style={{marginLeft:"10px"}}>Market</span>
      </Link>
      <Link
        to="exhibition"
        className="w3-bar-item w3-button"
        style={{ backgroundColor: exhibit, textAlign:"left",display:"flex",alignItems:"center"  }}
      >
        <BsEasel /> <span style={{marginLeft:"10px"}}>Exhibition</span>
      </Link>
      <Link
        to="users"
        className="w3-bar-item w3-button"
        style={{ backgroundColor: users, textAlign:"left",display:"flex",alignItems:"center"  }}
      >
        <FaRegUser /> <span style={{marginLeft:"10px"}}>Users</span>
      </Link>
      <Link
        to="artist"
        className="w3-bar-item w3-button"
        style={{ backgroundColor: artist, textAlign:"left",display:"flex",alignItems:"center"  }}
      >
        <MdOutlineColorLens /> <span style={{marginLeft:"10px"}}>Artist</span>
      </Link>
      <Link
        to="orders"
        className="w3-bar-item w3-button"
        style={{ backgroundColor: orders, textAlign:"left",display:"flex",alignItems:"center"  }}
      >
        <BsCart2 /> <span style={{marginLeft:"10px"}}>Orders</span>
      </Link>
      <p
        onClick={() => {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              navigate("/");
            })
            .catch((error) => {
              // An error happened.
              alert(error);
            });
        }}
        className="w3-bar-item w3-button w3-hover-red w3-round-large"
        style={{marginTop:"30%", textAlign:"left",display:"flex",alignItems:"center"  }}
      >
        <FaPowerOff /> <span style={{marginLeft:"10px"}}>Sign out</span>
      </p>
    </nav>
  );
}
