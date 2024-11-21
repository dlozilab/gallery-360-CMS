<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  style={{
    display: "flex",
    justifyContent: "center",
    // alignItems: "flex-start", // Align content to the top
    marginTop:"20", 
  }}
>
  <div
    className="w3-margin w3-padding w3-light-grey"
    style={{
      width: "60%",
      borderRadius: "8px",
    }}
  >
    <h3 className="w3-text-black">
      <FaReceipt /> Invoice #{invoice.id}
    </h3>

    {/* Customer Details */}
    <div className="w3-margin-bottom">
      <div>
        <FaUser className="w3-margin-right" /> <strong>Customer:</strong>{" "}
        {invoice.customer_contact.name}
      </div>
      <div>
        <FaEnvelope className="w3-margin-right" /> <strong>Email:</strong>{" "}
        {invoice.customer_contact.email}
      </div>
      <div>
        <FaMapMarkerAlt className="w3-margin-right" /> <strong>Address:</strong>{" "}
        {`${invoice.customer_address.street_address}, ${invoice.customer_address.local_area}, ${invoice.customer_address.city}, ${invoice.customer_address.zone}, ${invoice.customer_address.code}`}
      </div>
      <div>
        <FaCalendarAlt className="w3-margin-right" /> <strong>Date of
        Purchase:</strong> {new Date(invoice.dateOfPurchase).toLocaleString()}
      </div>
    </div>

    {/* Artworks Table */}
    <p className="w3-border-bottom w3-padding-small">
      <strong>Artworks Purchased</strong>
    </p>
    <table className="w3-table w3-bordered">
      <thead>
        <tr style={{ backgroundColor: "#CEB89E" }}>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {invoice.items.map((artwork, index) => (
          <tr key={index}>
            <td>{artwork.title}</td>
            <td>{`${artwork.currencySymbol} ${artwork.price.toFixed(2)}`}</td>
          </tr>
        ))}
      </tbody>
      <tfoot style={{ backgroundColor: "lightgray" }}>
        <tr>
          <td>
            <strong>Delivery Fee:</strong>
          </td>
          <td>{`${invoice.currencySymbol} ${invoice.deliveryFee.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>
            <strong>Subtotal:</strong>
          </td>
          <td>{`${invoice.currencySymbol} ${invoice.subtotal.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>
            <strong>VAT ({(invoice.VAT * 100).toFixed(0)}%):</strong>
          </td>
          <td>{`${invoice.currencySymbol} ${invoice.VAT_amount.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>
            <strong>Total:</strong>
          </td>
          <td>{`${invoice.currencySymbol} ${invoice.total.toFixed(2)}`}</td>
        </tr>
      </tfoot>
    </table>

    {/* Delivery Status */}
    <div className="w3-margin-top">
      <FaTruck className="w3-margin-right" />
      <strong>Delivery Status:</strong> {invoice.deliveryStatus}
    </div>

    {/* Special Instructions */}
    <div className="w3-margin-top">
      <strong>Special Instructions:</strong>{" "}
      {invoice.special_instructions_delivery}
    </div>
  </div>
</Modal>
