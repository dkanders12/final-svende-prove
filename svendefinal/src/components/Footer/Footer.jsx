import React, { useState } from "react";
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
        <h2>Bagtanker</h2>
        <p>Øster Uttrupvej 1 9000 Aalborg</p>
        <p>Tlf: 12345678 Email: info@bagtanker.dk</p>
      </article>
      <div className="sendEmail">
        <h3>Tilmeld dig Bagtankers nyhedsbrev</h3>
        <p>Få vores nyheder direkte i din indbakke</p>
        <form onSubmit={handleSubmit}>
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
      </div>
    </footer>
  );
};

export default Footer;
