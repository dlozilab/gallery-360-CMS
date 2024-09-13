import React from 'react';
import { Link } from "react-router-dom";

export default function NotAuth() {
  return (
    <main style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", minHeight:"95vh"}}>

            <img src={require('../assets/Gallery-360-cms.jpg')} alt='Gallery 360 logo' style={{width:"30%",marginTop:"2%"}}/>
            <h2>401 Unauthorized</h2>
            <p style={{marginBottom:"5%"}}>You do not have access to this page.</p>
            <Link to={"signin"}><button className="w3-button w3-purple w3-round">Back to login page.</button></Link>

    </main>
  )
}
