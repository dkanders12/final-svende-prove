import React from "react";
import Slideshow from "../components/Header.slide/Slideshow";
import EstatesList from "../components/FrontEstates/FrontEstates";
import EmployeeList from "../components/Ansatte/Ansatte";

const Forside = () => {
  return (
    <>
      <Slideshow></Slideshow>
      <EstatesList></EstatesList>
      <EmployeeList></EmployeeList>
    </>
  );
};

export default Forside;
