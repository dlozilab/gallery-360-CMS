import React, { useState } from "react";
import Modal from "./modal";
import { getRandomBoolean, toTitleCase } from "../utils/utils";
import { updateRecord } from "../firebase/firebaseMethods";
import "@fontsource/inter";
import { CgUnavailable } from "react-icons/cg";
import { FaRegCircleCheck } from "react-icons/fa6";
import OrdersModal from "./ordersModal";


export default function OrdersCard({ data, reload, setReload, collection }) {
  //console.log(data)
  // Initialize isApproved based on the isEnabled property
  const [isVisible, setIsVisible] = useState(false);

  //console.log("The value of data: ", data);
  const [status, setStatus] = useState(data.isEnabled ? "Approved" : "Decline");

  const handleApprove = () => {
    // Add approval logic here
    updateRecord("Market", data.id, { isEnabled: true });
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
    <tr style={{ backgroundColor: "white", borderBottom: "1px solid #ddd",width:"100%" }}>
      <td style={{ padding: "12px" }}>
        {" "}
        {/* Image cell */}
        <div>
          <p className="w3-text-black">{data.id}</p>
        </div>
      </td>
      
      <td>
        {" "}
        {/* Weight cell */}
        <div className="tooltip" style={{display:"flex",alignItems:"center"}}>
          <p className=" ellipsis-text" style={{color: "grey",}}>{data.customer_address.street_address}, {data.customer_address.city}, {data.customer_address.zone}, {data.customer_address.code}</p>
          <span className="tooltiptext" style={{color: "white",}}>{data.customer_address.street_address}, {data.customer_address.city}, {data.customer_address.zone}, {data.customer_address.code}</span>
        </div>
      </td>
      <td  style={{color: "grey",}}>
      {new Date(
            data.dateOfPurchase
          ).toDateString()}
      </td>
      <td  style={{color: "grey",}}>
      <div>
          <p  style={{color: "grey",}}>{data.total}</p>
        </div>
      </td>

      <td>

        {/* Dropdown cell */}
        <div>
          <p  style={{color: "grey",}}>{data.deliveryStatus}</p>
        </div>
        <Modal
          visible={isVisible}
          close={setIsVisible}
          data={data}
          reload={reload}
          setReload={setReload}
          collection={collection}
        />
      </td>
      <td>
        <div>
          <OrdersModal invoice={data} />
        </div>
      </td>
    </tr>
  );
}
