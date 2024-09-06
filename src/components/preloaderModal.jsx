import React from "react";

export default function PreloaderModal({ visible, onClose }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        zIndex: 99,
        position: "absolute",
        top: "0",
        left: "0",
        display: visible ? "block" : "none",
        background: "rgba(255, 255, 255, 0.8)",
      }}
      onClick={() => onClose()}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={require("../assets/Spinner@1x-1.0s-200px-200px (1).gif")}
          alt="Loading content..."
        />
      </div>
    </div>
  );
}
