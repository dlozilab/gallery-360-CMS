import React from 'react';
import { Link,useParams } from "react-router-dom";

export default function Navbar() {
  
  return (
    <nav className="w3-bar w3-border w3-light-grey w3-padding" style={{position:"fixed",top:"0",zIndex:"99"}}>
  <Link to="market" className="w3-bar-item w3-button">Market</Link>
  <Link to="exhibition" className="w3-bar-item w3-button">Exhibition</Link>
  <Link to="users"className="w3-bar-item w3-button">Users</Link>
  <Link to="artist" className="w3-bar-item w3-button">Artist</Link>
  <Link to="orders" className="w3-bar-item w3-button">Orders</Link>
</nav>

  )
}
