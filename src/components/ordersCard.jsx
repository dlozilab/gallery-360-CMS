import React, { useState } from "react";
import Modal from "./modal";
import { toTitleCase } from "../utils/utils";
import { IoIosGlobe, IoIosPhonePortrait } from "react-icons/io";

export default function OrdersCard({ order }) {
  //console.log("the order: ", order);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(
    order.isEnabled ? "Approved" : "Decline"
  );

  const handleApprove = () => {
    // Add approval logic here
  };

  const handleDecline = () => {
    setIsVisible(true);
  };

  const handleStatusChange = (event) => {
    if (event.target.value === "Approved") {
      handleApprove();
    }
    if (event.target.value === "Decline") {
      handleDecline();
    }
    setStatus(event.target.value);
  };

  return (
    <div
      className="w3-card-4 w3-margin w3-white w3-round"
      style={{

        padding: "20px",
        textAlign: "left",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      {/* Address Details */}
      <header style={{ marginBottom: "15px" }} className="w3-container w3-text-white w3-teal">
        <h3>Order #{order.id}</h3>
      </header>

      {/* Order Date */}
      <div style={{ marginBottom: "15px" }}>
      <p><strong>City:</strong> {order.address.city}</p>
        <p><strong>State:</strong> {order.address.state}</p>
        <p><strong>Postal Code:</strong> {order.address.postal_code}</p>
        <p><strong>Country Code:</strong> {order.address.country_code}</p>
        <p><strong>Order Date:</strong> {new Date(order.date.seconds * 1000 + order.date.nanoseconds / 1000000).toDateString()}</p>
      </div>

      {/* Price */}
      <footer style={{ marginBottom: "15px" }} className="w3-border-top">
        <h3>Total Price R{order.price}</h3>
        <p></p>
      </footer>
    </div>
  );
}
