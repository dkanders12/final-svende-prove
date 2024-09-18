import React, { useEffect, useState } from "react";
import { supabase } from "../../providers/LoginController"; // Make sure this is the correct path
import "./kontaktForm.scss";
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

    try {
      const { data, error } = await supabase.from("contact_messages").insert([
        {
          name,
          message,
          employee_id: employeeId, // Employee ID from the selected option
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

  return (
    <section className="message-form">
      <h2>Contact Us</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Select Employee:
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option value="">Select an Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstname} {employee.lastname}
              </option>
            ))}
          </select>
        </label>

        {/* Message Input */}
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        {/* Submit Button */}
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default ContactForm;
