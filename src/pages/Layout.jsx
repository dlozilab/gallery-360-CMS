import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Fixed Navbar */}
      <div
        style={{
          width: "350px", // Updated width
          position: "fixed",
          top: 0,
          bottom: 0,
          backgroundColor: "#f4f4f4", // Adjust as needed
          padding: "1rem",
        }}
      >
        <Navbar />
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "350px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
