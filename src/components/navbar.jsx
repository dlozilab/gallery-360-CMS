import React from 'react';
import { Link,useLocation } from "react-router-dom";

export default function Navbar() {

  let currentPage = useLocation();
  let mark,exhibit,users,artist,orders = null;
  
  if (currentPage.pathname==="/market") mark="#CEB89E";
  if (currentPage.pathname==="/exhibition") exhibit="#CEB89E";
  if (currentPage.pathname==="/users") users="#CEB89E";
  if (currentPage.pathname==="/artist") artist="#CEB89E";
  if (currentPage.pathname==="/orders") orders="#CEB89E";
  
  //console.log("Current page: ",currentPage)
  return (
    <nav className="w3-bar w3-border w3-light-grey w3-padding" style={{position:"fixed",top:"0",zIndex:"99"}}>
  <Link to="market" className="w3-bar-item w3-button" style={{backgroundColor:mark}}>Market</Link>
  <Link to="exhibition" className="w3-bar-item w3-button" style={{backgroundColor:exhibit}}>Exhibition</Link>
  <Link to="users"className="w3-bar-item w3-button" style={{backgroundColor:users}}>Users</Link>
  <Link to="artist" className="w3-bar-item w3-button" style={{backgroundColor:artist}}>Artist</Link>
  <Link to="orders" className="w3-bar-item w3-button" style={{backgroundColor:orders}}>Orders</Link>
</nav>

  )
}
