import React, { useEffect, useState } from "react";
import { fetchEstatesWithTypeAndImages } from "../../providers/Estates"; // Adjust the path
import "./FrontEstates.scss";
import { Link } from "react-router-dom";
const EstatesList = () => {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEstatesWithTypeAndImages();
      setEstates(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Limit to first 3 estates
  const limitedEstates = estates.slice(0, 3);

  return (
    <div className="estates-container">
      {limitedEstates.map((estate) => (
        <EstateCard key={estate.id} estate={estate} />
      ))}
    </div>
  );
};

const EstateCard = ({ estate }) => {
  const {
    id,
    address,
    price,
    num_rooms,
    ground_space,
    estate_image_rel,
    estate_types,
    cities,
    energy_labels,
  } = estate;

  // Check if there are images and get the first one, if available
  const primaryImage = estate_image_rel?.[0]?.images?.image_url;

  return (
    <div className="estate-card">
      <Link to={`/estate/${id}`}>
        {primaryImage ? (
          <img src={primaryImage} alt={address} className="estate-image" />
        ) : (
          <p>No image available</p> // Display this message if no image URL is found
        )}
        <div className="estate-details">
          <h3>{address}</h3>
          <div id="city">
            <p>{cities?.zipcode}</p>
            <p>{cities?.name}</p>
          </div>{" "}
          <p>{estate_types?.name}</p>
          <p>
            {num_rooms} værelser, {ground_space} m²
          </p>
          <i id="energy">{energy_labels?.letter}</i>
          <p className="estate-price">{price.toLocaleString()} DKK</p>
        </div>
      </Link>
    </div>
  );
};

export default EstatesList;
