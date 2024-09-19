import React, { useEffect, useState } from "react";
import { supabase } from "../../providers/LoginController"; // Adjust the path
import "./kontaktForm.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ContactForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [employeeId, setEmployeeId] = useState(""); // Employee ID state
  const [employees, setEmployees] = useState([]); // State to hold the list of employees
  const [status, setStatus] = useState("");

  // Fetch employees from Supabase
  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("employees") // Replace this with your actual table name if different
        .select("id, firstname, lastname");

      if (error) {
        console.error("Error fetching employees:", error);
      } else {
        setEmployees(data);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); // Clear status

    if (!name || !message || !employeeId) {
      setStatus("Please fill in all fields");
      return;
    }
    const created_at = new Date().toISOString(); // Create timestamp in ISO format

    try {
      const { data, error } = await supabase.from("contact_messages").insert([
        {
          name,
          message,
          employee_id: employeeId,
          created_at,
        },
      ]);

      if (error) {
        setStatus("Error sending message");
        console.error(error);
      } else {
        setStatus("Message sent successfully");
        setName("");
        setMessage("");
        setEmployeeId(""); // Reset form fields
      }
    } catch (error) {
      setStatus("An error occurred");
      console.error(error);
    }
  };

  // Coordinates for Øster Uttrup Vej 1, Aalborg
  const position = [57.0477, 9.9669];

  return (
    <section className="message-form">
      <article className="form-left">
        <h2>Kontakt</h2>
        <p>
          Udfyld og send formularen og vi vil hurtigst muligt besvare dine
          spørgsmål.
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Navn*:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Indtast dit navn"
            />
          </label>

          <label>
            Medarbejder*:
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option value="">Vælg medarbejder</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstname} {employee.lastname}
                </option>
              ))}
            </select>
          </label>

          <label>
            Besked*:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Indtast din besked"
            />
          </label>

          <button type="submit">Send</button>
        </form>
      </article>

      <article className="form-right">
        <p>Find os her:</p>
        <MapContainer center={position} zoom={13} className="leaflet-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Øster Uttrup Vej 1, 9000 Aalborg</Popup>
          </Marker>
        </MapContainer>
      </article>
    </section>
  );
};

export default ContactForm;
