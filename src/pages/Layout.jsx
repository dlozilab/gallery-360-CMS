import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout(){

  return (
    <>
    <div style={{ display:"flex"}}>
      <Navbar />
      <Outlet/>
    </div>
      
      <Footer />
    </>
  );
}
