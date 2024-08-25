import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav class="w3-bar w3-border w3-light-grey w3-padding">
  <Link to="market" class="w3-bar-item w3-button">Market</Link>
  <Link to="exhibition" class="w3-bar-item w3-button">Exhibition</Link>
  <Link to="users" class="w3-bar-item w3-button">Users</Link>
  <Link to="artist" class="w3-bar-item w3-button">Artist</Link>
  <Link to="orders" class="w3-bar-item w3-button">Orders</Link>
</nav>

  )
}
