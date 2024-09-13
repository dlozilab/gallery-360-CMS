// artistView.js
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { toTitleCase } from "../utils/utils";
import { IoIosGlobe, IoIosPhonePortrait } from "react-icons/io";

const ArtistView = () => {
  const location = useLocation();
  const artist = location.state || {};
  
  if (!artist) {
    return <h1 style={{width: "100%",minHeight:"93vh" ,display:"flex",justifyContent:"center",alignItems:"center",marginTop:"7vh"}}>aArtist not found</h1>;
  }
console.log("The state location obj: ",artist)

  return (
    <div
      style={{ display: "flex", width: "100%",minHeight:"93vh"}}
    >
      <div
        style={{
          backgroundImage: `url(${
            artist.photoUrl ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50%",
        }}
      ></div>
      <div style={{width: "50%",}}>
        <h1 className="w3-center">{artist.title}</h1>

        <div className="w3-container w3-padding">
        <h3 className="w3-text-black">{toTitleCase(artist.artistName)}</h3>
        <p>
          <IoIosPhonePortrait /> {artist.contactnumber}
          <br></br>
          <IoIosGlobe /> <a href={artist.websiteurl}>{artist.websiteurl}</a>
        </p><br></br>
        <p>
          Bio: {artist.biography}
        </p>
        </div>
        <div style={{padding:"2%",marginTop:"5%"}}>
          <video width="480" height="320" controls>
            <source src={artist.videoUrl} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
        <div className="w3-container w3-padding-16">
          <Link to=".." className="w3-button w3-text-white" style={{backgroundColor:"#CEB89E"}}>
            Back to Artists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistView;
