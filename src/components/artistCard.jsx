import React, { useState } from "react";
import Modal from "./modal";
import { toTitleCase } from "../utils/utils";
import { updateRecord } from "../firebase/firebaseMethods";
import "@fontsource/inter";
import BioModal from "./bioModal";
import ViewVideo from "./viewVideo";

export default function ArtistCard({ data, reload, setReload, collection }) {
  //console.log("Rendered Market")
  // Initialize isApproved based on the isEnabled property
  const [isVisible, setIsVisible] = useState(false);
  const [openBio, setOpenBio] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  //console.log("The value of data: ", data);
  const [status, setStatus] = useState(data.isEnabled ? "Approved" : "Decline");

  // Find the image URL with default: true
  //const defaultImageUrl = data.imgUrls.find((img) => img.default)?.imgUrl;

  const handleApprove = () => {
    // Add approval logic here
    updateRecord(collection, data.id, { isEnabled: true });
    setReload(!reload);
    alert(
      `Record:${data.id} [from ${collection}] has been successfully updated!`
    );
  };

  const handleDecline = () => {
    setIsVisible(true);
  };

  // Update status based on dropdown selection
  const handleStatusChange = (event) => {
    if (event.target.value === "Approved") {
      handleApprove();
    }
    if (event.target.value === "Decline") {
      handleDecline();
    }
  };
  return (
    <tr
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        width: "100%",
      }}
    >
      <td style={{ padding: "12px" }}>
        {/* Image cell */}
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundImage: `url(${data.photoUrl||data.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            borderRadius: "100%",
          }}
        ></div>
      </td>
      <td>
        <div>
          <p className="w3-text-black">{toTitleCase(data.fullName||data.fullname)}</p>
        </div>
      </td>
      <td>
        <div style={{ color: "grey" }}>
          <p>{data.contactnumber||data.contactNumber}</p>
        </div>
      </td>
      <td style={{ color: "grey" }}>
        <p>{data.websiteUrl}</p>
      </td>
      <td style={{ color: "grey" }}>
        <p
          onClick={() => setOpenBio(true)}
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          View{" "}
        </p>
        <BioModal
          visible={openBio}
          close={setOpenBio}
          data={data}
          reload={reload}
          setReload={setReload}
          collection={collection}
        />
      </td>
      <td>
<ViewVideo videoUrl={data.videoUrl}/>

      </td>
      <td>
        {/* Dropdown cell */}
        <select
          id="status-select"
          className="w3-select w3-round"
          value={data.isEnabled ? "Approved" : "Decline"}
          onChange={handleStatusChange}
          style={{
            width: "120px",
            paddingLeft: "2%",
            paddingRight: "5%",
            backgroundColor: data.isEnabled ? "#dffeed" : "#ffd8db",
            color: data.isEnabled ? "#016d4b" : "#ff1821",
          }}
        >
          <option value="Approved">Approved</option>
          <option value="Decline">Decline</option>
        </select>
        <Modal
          visible={isVisible}
          close={setIsVisible}
          data={data}
          reload={reload}
          setReload={setReload}
          collection={collection}
        />
      </td>
    </tr>
  );
}
