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
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

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
    <CssVarsProvider>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Signin />} />
            <Route
              path="market"
              element={accessAllRoutes ? <Market /> : null}
            />
            <Route
              path="exhibition"
              element={accessAllRoutes ? <Exhibition /> : <Signin />}
            />
            <Route
              path="users"
              element={accessAllRoutes ? <Users /> : <Signin />}
            />
            <Route path="artist">
              <Route
                index
                element={accessAllRoutes ? <Artist /> : <Signin />}
              />
              <Route
                path=":id"
                element={accessAllRoutes ? <ArtistView /> : <Signin />}
              />
            </Route>
            <Route
              path="orders"
              element={accessAllRoutes ? <Orders /> : <Signin />}
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
