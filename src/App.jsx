import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Market from './pages/Market';
import Exhibition from './pages/Exhibition';
import Users from './pages/Users';
import Orders from './pages/Orders';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Artist from './pages/Artist';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="market" element={<Market />} />
          <Route path="exhibition" element={<Exhibition />} />
          <Route path="users" element={<Users />} />
          <Route path="artist" element={<Artist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route index element={<Login />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
