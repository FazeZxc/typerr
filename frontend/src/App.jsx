import { RecoilRoot} from "recoil";
import "./App.css";
import { Hero } from "./pages/Hero";
import { Scoreboard } from "./pages/Scoreboard";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";

function App() {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  });
  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
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
      )}
    </div>
  );
}

export default App;
