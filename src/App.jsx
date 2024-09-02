import "./App.css"
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="market" element={<Market />} />
          <Route path="exhibition" element={<Exhibition />} />
          <Route path="users" element={<Users />} />
          <Route path="artist">
            <Route index element={<Artist />} />
            <Route path=":id" element={<ArtistView />} />
          </Route>
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route index element={<Signin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
