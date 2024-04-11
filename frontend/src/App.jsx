import { RecoilRoot } from "recoil";
import "./App.css";
import { Hero } from "./pages/Hero";
import { Scoreboard } from "./pages/Scoreboard";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth";

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><Header></Header><Hero></Hero></>}></Route>
            <Route path="/auth" element={<><Header></Header><Auth></Auth></>}></Route>
            <Route path="/result" element={<><Header></Header><Scoreboard></Scoreboard></>}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
