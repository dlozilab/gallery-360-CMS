import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPaintBrush,
  FaDollarSign,
  FaTruck,
  FaReceipt,
} from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OrdersModal({ invoice }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <p
          onClick={handleOpen}
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          View
        </p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

        style={{display:"flex",justifyContent:"center",alignItems:"center"}}
      >
        <div className="w3-margin w3-padding w3-light-grey" style={{width:"60%"}}>
          <h3 className="w3-text-blue">
            <FaReceipt /> Invoice #{invoice.invoiceNumber}
          </h3>
          <div className="w3-margin-bottom">
            <div>
              <FaUser className="w3-margin-right" /> <strong>User:</strong>{" "}
              {invoice.userName}
            </div>
            <div>
              <FaEnvelope className="w3-margin-right" /> <strong>Email:</strong>{" "}
              {invoice.email}
            </div>
            <div>
              <FaMapMarkerAlt className="w3-margin-right" />{" "}
              <strong>Billing Address:</strong>{" "}
              {`${invoice.billingAddress.street}, ${invoice.billingAddress.city}, ${invoice.billingAddress.state}, ${invoice.billingAddress.zipCode}`}
            </div>
            <div>
              <FaCalendarAlt className="w3-margin-right" />{" "}
              <strong>Date of Purchase:</strong>{" "}
              {new Date(invoice.dateOfPurchase).toLocaleString()}
            </div>
          </div>

          <p className="w3-border-bottom w3-padding-small">
            Artworks Purchased
          </p>
          <ul className="w3-ul w3-margin-bottom">
            {invoice.artworksPurchased.map((artwork, index) => (
              <li key={index} className="w3-padding-small">
                ●  {artwork.title} by{" "}
                {artwork.artist} - {" "}
                {artwork.price}
              </li>
            ))}
          </ul>

          <div className="w3-margin-bottom">
            <div>
              <strong>Subtotal:</strong>{" "}
               {invoice.subtotal}
            </div>
            <div>
              <strong>Tax:</strong> {" "}
              {invoice.tax}
            </div>
            <div>
              <strong>Delivery Fee:</strong>{" "}
               {invoice.deliveryFee}
            </div>
            <div>
              <strong>Total:</strong>{" "}
              {invoice.total}
            </div>
          </div>
          <div>
            <FaTruck className="w3-margin-right" />{" "}
            <strong>Delivery Status:</strong> {invoice.deliveryStatus}
          </div>
        </div>
      </Modal>
    </>
  );
}
