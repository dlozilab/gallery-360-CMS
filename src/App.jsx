import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotAuth from "./pages/NotAuth"

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
          <Route path="/" element={<Layout />}>
            <Route index element={<Signin />} />
            <Route
              path="market"
              element={accessAllRoutes ? <Market /> : <NotAuth/>}
            />
            <Route
              path="exhibition"
              element={accessAllRoutes ? <Exhibition /> :  <NotAuth/>}
            />
            <Route
              path="users"
              element={accessAllRoutes ? <Users /> :  <NotAuth/>}
            />
            <Route path="artist">
              <Route
                index
                element={accessAllRoutes ? <Artist /> :  <NotAuth/>}
              />
              <Route
                path=":id"
                element={accessAllRoutes ? <ArtistView /> :  <NotAuth/>}
              />
            </Route>
            <Route
              path="orders"
              element={accessAllRoutes ? <Orders /> : <NotAuth/>}
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
