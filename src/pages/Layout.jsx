import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout() {
  return (<>
    <div style={{ display: "flex", width:"100%",minHeight:"100%"}}>
      {/* Fixed Navbar */}
      <div
        style={{
          width: "15%", // Updated width
          height:"100%",
        }}
      >
        <Navbar />
      </div>

      {/* Main Content */}
      <div
        style={{
          width: "85%", // Updated width
          height:"100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
          <Outlet />
      </div>
      
    </div>
    <Footer />
  </>);
}
