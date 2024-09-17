import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Forside from "./pages/Forside";
import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./components/Login/Login";
import Boliger from "./pages/Boliger";
import EstateDetail from "./components/EstateDetails/EstateDetail";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Forside />}></Route>
        <Route path="/Boliger" element={<Boliger />}></Route>
        <Route path="/Login" element={<LoginForm />}></Route>
        <Route path="/estate/:id" element={<EstateDetail />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
