import React from 'react';
import { useNavigate } from "react-router-dom";

export default function NotAuth() {

  const navigate = useNavigate();

  return (
    <main style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", minHeight:"95vh"}}>

            <img src={require('../assets/Gallery-360-cms.jpg')} alt='Gallery 360 logo' style={{width:"30%",marginTop:"2%"}}/>
            <h2>401 Unauthorized</h2>
            <p style={{marginBottom:"5%"}}>You do not have access to this page.</p>
            <button onClick={()=>navigate("../", { replace: true })} className="w3-button w3-round" style={{backgroundColor:"#640404",color:"white"}}>Back to login page</button>

    </main>
  )
}
