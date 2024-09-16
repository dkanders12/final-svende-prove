import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Forside from "./pages/Forside";
import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./components/Login/Login";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Forside />}></Route>
        <Route path="/Login" element={<LoginForm />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
