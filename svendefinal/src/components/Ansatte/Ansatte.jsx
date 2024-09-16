import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../../providers/Ansatte"; // Adjust the path
import "./Ansatte.scss";

const EmployeeList = () => {
  const [employe, setEmploye] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();
      setEmploye(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="employee-container">
      <h2>Mød vores ansatte</h2>
      <div id="gap">
        {employe.map((employe) => (
          <EmployeCard key={employe.id} employe={employe} />
        ))}
      </div>
    </section>
  );
};

const EmployeCard = ({ employe }) => {
  const { firstname, lastname, position, image_url, phone, email } = employe;

  return (
    <>
      <article id="employee">
        <img src={image_url} alt={`${firstname} ${lastname}`} />
        <div id="text-hover">
          <h3>{`${firstname} ${lastname}`}</h3>
          <p>{position}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </div>
      </article>
    </>
  );
};

export default EmployeeList;
