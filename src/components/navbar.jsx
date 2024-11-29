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

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentPage = useLocation().pathname;

  const linkStyle = {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    marginBottom: "2%",
    padding: "10px 15px",
    borderRadius: "8px",
    transition: "background-color 0.3s",
  };

  const highlightColor = "#CEB89E";

  const links = [
    { to: "market", label: "Market", icon: <SiMarketo /> },
    { to: "exhibition", label: "Exhibition", icon: <BsEasel /> },
    { to: "users", label: "Users", icon: <FaRegUser /> },
    { to: "artist", label: "Artist", icon: <MdOutlineColorLens /> },
    { to: "orders", label: "Orders", icon: <BsCart2 /> },
  ];

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        width: "350px",
        backgroundColor: "white",
        padding: "10%",
        maxHeight: "100vh",
        overflowY: "auto",
        boxSizing: "border-box",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20%",
        }}
      >
        <img
          src={require("../assets/Gallery-360-cms-removebg-preview.png")}
          alt="gallery 360 logo"
          style={{ width: "80%" }}
        />
        <p style={{ fontWeight: "bold", fontSize: 30, color: "#333" }}>
          Gallery 360
        </p>
      </div>

      {links.map(({ to, label, icon }) => (
        <Link
          key={to}
          to={to}
          style={{
            ...linkStyle,
            backgroundColor: currentPage === `/${to}` ? highlightColor : "",
          }}
        >
          {icon} <span style={{ marginLeft: "10px" }}>{label}</span>
        </Link>
      ))}

      <p
        onClick={() => {
          signOut(auth)
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              alert(error);
            });
        }}
        style={{
          ...linkStyle,
          marginTop: "auto",
          cursor: "pointer",
          color: "#d9534f",
        }}
      >
        <FaPowerOff /> <span style={{ marginLeft: "10px" }}>Sign out</span>
      </p>
    </nav>
  );
};

export default Navbar;
