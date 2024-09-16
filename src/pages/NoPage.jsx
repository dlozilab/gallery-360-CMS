import React from 'react';
import { useNavigate } from "react-router-dom";

export default function NoPage() {

  const navigate = useNavigate();

  return (
    <main style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", minHeight:"95vh"}}>

            <img src={require('../assets/Gallery-360-cms.jpg')} alt='Gallery 360 logo' style={{width:"30%",marginTop:"2%"}}/>
            <h2>404 Error</h2>
            <p style={{marginBottom:"5%"}}>Page Not Found.</p>
            <button onClick={()=>navigate("market", { replace: true })} className="w3-button w3-round" style={{backgroundColor:"#640404",color:"white"}}>Back to Market page</button>

    </main>
  )
}
