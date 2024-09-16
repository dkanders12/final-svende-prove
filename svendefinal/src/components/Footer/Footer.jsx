import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import "./Footer.scss";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("du er nu tilmeldt nyhedsbrev");
      setEmail("");
    }
  };

  return (
    <footer>
      <article id="info">
        <h2>MiCasa</h2>
        <p>Øster Uttrupvej 5 9000 Aalborg</p>
        <p>Email: info@homelands.dk Telefon: +45 1122 3344</p>
      </article>
      <article id="middle">
        <ul>
          <li>forside</li>
          <li>boliger</li>
          <li>kontakt</li>
          <li>Login</li>
        </ul>
      </article>
      <article className="sendEmail">
        <h3>Få drømmehuset i din indbakke</h3>
        <p>
          Tilmeld dig til vores nyhedsbrev og få nye boliger sendt direkte til
          din indbakke
        </p>
        <form onSubmit={handleSubmit}>
          {" "}
          <MdAlternateEmail id="mail"></MdAlternateEmail>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button id="tilmeld" type="submit">
            Tilmeld
          </button>
        </form>
      </article>
    </footer>
  );
};

export default Footer;
