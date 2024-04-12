import { RecoilRoot } from "recoil";
import "./App.css";
import { Hero } from "./pages/Hero";
import { Scoreboard } from "./pages/Scoreboard";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Footer } from "./components/Footer";
import { useEffect } from "react";

function App() { 
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header></Header>
                  <Hero></Hero>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/auth"
              element={
                <>
                  <Header></Header>
                  <Auth></Auth>
                  <Footer></Footer>
                </>
              }
            ></Route>
            <Route
              path="/result"
              element={
                <>
                  <Header></Header>
                  <Scoreboard></Scoreboard>
                  <Footer></Footer>
                </>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
