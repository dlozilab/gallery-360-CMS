import React from 'react';
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <main style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>

            <img src={require('../assets/Gallery-360-cms.jpg')} alt='Gallery 360 logo' style={{width:"30%",marginTop:"2%"}}/>
            <h2>404: Page Not Found.</h2>
            <Link to={"market"}><button class="w3-button w3-purple w3-round">Back to Market page.</button></Link>

    </main>
  )
}