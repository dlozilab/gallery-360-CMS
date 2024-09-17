import React from "react";

const VideoModal = ({
  visible,
  close,
  data,
  reload,
  setReload,
  collection,
}) => {
  if (!visible) return null; // If the modal is not visible, return null

  const closeVideo = () => {
    close(false);
  };

  return (
    <div
      className="w3-modal w3-round"
      style={{ display: visible ? "inline-block" : "none" }}
    >
      <div className="w3-modal-content w3-round-large w3-black">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2%",
            backgroundColor: "#CEB89E",
            marginBottom: "2%",
          }}
        >
          <span className="w3-text-white w3-xlarge">{data.artistName}</span>
          <span
            onClick={() => {
              close(!visible)
            }}
            className="w3-button w3-border w3-border-white w3-round-large"
            style={{ cursor: "pointer", color: "white" }}
          >
            &times;
          </span>
        </header>
        <video width="100%" controls>
          <source src={data.videoUrl} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
