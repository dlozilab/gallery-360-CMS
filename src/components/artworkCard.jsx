import React, { useState } from 'react';

const ArtworkCard = ({ artwork }) => {
  // Initialize isApproved based on the isEnabled property
  const [isApproved, setIsApproved] = useState(artwork.isEnabled);

  // Find the image URL with default: true
  const defaultImageUrl = artwork.imgUrls.find((img) => img.default)?.imgUrl;

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleDecline = () => {
    setIsApproved(false);
  };

  return (
    <div className="w3-card-4 w3-margin w3-white" style={{ width: '25%'}}>
      <div
        className="w3-display-container"
        style={{
          backgroundImage: `url(${defaultImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50%',
        }}
      ></div>
      <div className="w3-container w3-opacity" style={{ height: '50%', padding: '16px', position: 'relative', backgroundColor: 'white', opacity: '0.8' }}>
        <h3 className="w3-text-black">{artwork.title}</h3>
        <p className="w3-text-black">
          Dimensions: {artwork.dimensions.height} x {artwork.dimensions.width} x {artwork.dimensions.length} cm
        </p>
        <p className="w3-text-black">Price: R{artwork.price}</p>
        <div className="w3-bar">
          <button
            className={`w3-button w3-green ${artwork.isEnabled ? 'w3-opacity' : 'w3-opacity-min'}`}
            onClick={handleApprove}
          >
            Approve
          </button>

          <button
            className={`w3-button w3-red ${!artwork.isEnabled ? 'w3-opacity' : 'w3-opacity-min'}`}
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
