import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Forside from "./pages/Forside";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Forside />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
