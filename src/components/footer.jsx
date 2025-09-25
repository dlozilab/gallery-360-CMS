import React from 'react'

export default function Footer() {
  return (
    <footer style={{backgroundColor:"black",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1%",width:"100%"}}>
      <p style={{fontSize:20,}}>
        Copyright © 2024 | Gallery 360º
      </p>
      <img
            src={require("../assets/Invert-Gallery-360-cms-logo.jpg")}
            alt="gallery 360 logo"
            style={{ width: "5%" }}
          />
    </footer>
  )
}
