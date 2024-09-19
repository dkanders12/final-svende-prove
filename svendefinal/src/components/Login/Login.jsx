import React, { useState, useEffect } from "react";
import { supabase } from "../../providers/LoginController";

import AdminPanel from "../AdminPanel/AdminPanel";
import "./Login.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.session) {
        localStorage.setItem("access_token", data.session.access_token);
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  return (
    <section className="loginSide">
      {user ? (
        <div className="edit">
          <AdminPanel />
          <div className="logout">
            <h3>Welcome, {user.email}</h3>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
      ) : (
        <article id="LoginContainer">
          <div id="LoginFix">
            <h2>Log in</h2>
            <p>Indtast og send username og password for at logge ind.</p>

            <form onSubmit={handleLogin}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Indtast dit brugernavn"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Indtast dit password"
                />
              </div>
              <button type="submit">Log in</button>
            </form>
          </div>
        </article>
      )}
    </section>
  );
};

export default LoginForm;
