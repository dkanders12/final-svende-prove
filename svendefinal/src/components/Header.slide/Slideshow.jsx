import React, { useState, useEffect } from "react";
import "./SlideShow.scss";
import Navbar from "../Navbar/Navbar";
import picture1 from "../../assets/SlideShow/slide-1.jpg";
import picture2 from "../../assets/SlideShow/slide-2.jpg";
import picture3 from "../../assets/SlideShow/slide-3.jpg";
import picture4 from "../../assets/SlideShow/slide-4.jpg";
import picture5 from "../../assets/SlideShow/slide-5.jpg";
import picture6 from "../../assets/SlideShow/slide-6.jpg";

const Slideshow = () => {
  // Corrected array to use imported images
  const images = [picture1, picture2, picture3, picture4, picture5, picture6];

  const [current, setCurrent] = useState(0); // State for the current slide
  const length = images.length;

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Auto-slide functionality
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide(); // Automatically move to the next slide
    }, 5000); // Slide every 3 seconds

    return () => clearInterval(autoSlide); // Cleanup interval on component unmount
  }, [current]);

  return (
    <>
      <Navbar />
      <div className="slideshow-container">
        {/* Left Arrow */}
        <div className="arrow left-arrow" onClick={prevSlide}>
          &#10094;
        </div>

        {/* Background Image */}
        <div
          className="slide"
          style={{ backgroundImage: `url(${images[current]})` }}
        ></div>

        {/* Right Arrow */}
        <div className="arrow right-arrow" onClick={nextSlide}>
          &#10095;
        </div>
      </div>
    </>
  );
};

export default Slideshow;
