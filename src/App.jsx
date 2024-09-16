import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Market from "./pages/Market";
import Exhibition from "./pages/Exhibition";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import NoPage from "./pages/NoPage";
import Signin from "./pages/Signin";
import Artist from "./pages/Artist";
import ArtistView from "./pages/artistView";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { FIREBASE_APP } from "./firebase/firebase.config";
import NotAuth from "./pages/NotAuth";

function App() {
  const auth = getAuth(FIREBASE_APP);
  const [accessAllRoutes, setAccessAllRoutes] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccessAllRoutes(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {accessAllRoutes ? (
          <Route path="/" element={<Layout />}>
            <Route path={"market"} element={<Market />} />
            <Route path="exhibition" element={<Exhibition />} />
            <Route path="users" element={<Users />} />
            <Route path="artist">
              <Route index element={<Artist />} />
              <Route path=":id" element={<ArtistView />} />
            </Route>
            <Route path="orders" element={<Orders />} />
          </Route>
        ) : (
          <Route>
            <Route path={"market"} element={<NotAuth />} />
            <Route path="exhibition" element={<NotAuth />} />
            <Route path="users" element={<NotAuth />} />
            <Route path="artist">
              <Route index element={<NotAuth />} />
              <Route path=":id" element={<NotAuth />} />
            </Route>
            <Route path="orders" element={<NotAuth />} />
          </Route>
        )}
        <Route index element={<Signin />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
