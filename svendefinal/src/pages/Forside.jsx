import React from "react";
import Slideshow from "../components/Header.slide/Slideshow";
import EstatesList from "../components/FrontEstates/FrontEstates";
import EmployeeList from "../components/Ansatte/Ansatte";
import Reviews from "../components/reviews/reviews";

const Forside = () => {
  return (
    <>
      <Slideshow></Slideshow>
      <EstatesList></EstatesList>
      <Reviews></Reviews>
      <EmployeeList></EmployeeList>
    </>
  );
};

export default Forside;
