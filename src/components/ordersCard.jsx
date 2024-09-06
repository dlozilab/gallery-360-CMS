import React, { useState } from "react";
import Modal from "./modal";
import { toTitleCase } from "../utils/utils";
import { IoIosGlobe, IoIosPhonePortrait } from "react-icons/io";

export default function OrdersCard({ order }) {
  //console.log("the order: ", order);

  const handleStatusChange = () => {
    if (order.status === "Processing") {
      return "#CCCCFF";
    }
    if (order.status=== "Dispatched") {
      return "#FFBF00";
    }
    if (order.status=== "Delivered") {
      return "#40E0D0";
    }
  };

  return (
    <div
      className="w3-card-4 w3-margin w3-white w3-round-large"
      style={{
        textAlign: "left",
        width:"400px"
      }}
    >
      {/* Address Details */}
      <header className="w3-text-white" style={{padding:"2%",backgroundColor:"#CEB89E"}}>
      <span style={{fontSize:20,fontWeight:800}}>Order No: </span> <br></br>
      <span style={{fontSize:20,fontWeight:500}}>{order.id}</span>
      </header>

      {/* Order Date */}
      <div style={{padding:"2%"}}>
        <p>
          <strong>City:</strong> {order.address.city} <br></br>

          <strong>State:</strong> {order.address.state} <br></br>

          <strong>Postal Code:</strong> {order.address.postal_code} <br></br>

          <strong>Country Code:</strong> {order.address.country_code} <br></br>

          <strong>Order Date:</strong>{" "}
          {new Date(
            order.date.seconds * 1000 + order.date.nanoseconds / 1000000
          ).toDateString()} <br></br>
          <strong>Status:</strong> <span style={{backgroundColor:handleStatusChange()}}>{order.status}</span>
        </p>
      </div>

      {/* Price */}
      <footer className="w3-border-top" style={{display:"flex",justifyContent:"space-between",padding:"2%"}}>
        <span style={{fontSize:20,fontWeight:800}}>Total Price </span>
        <span style={{fontSize:20,fontWeight:800}}>R{order.price}</span>
      </footer>
    </div>
  );
}
