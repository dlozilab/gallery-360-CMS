import React from 'react'

export default function Footer() {
  return (
    <footer style={{backgroundColor:"black",color:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"2%",left:"0",bottom:"0",width:"100%"}}>
      <img
            src={require("../assets/Invert-Gallery-360-cms-logo.jpg")}
            alt="gallery 360 logo"
            style={{ width: "5%" }}
          />
      Copyright © 2024 | Gallery 360º
    </footer>
  )
}
