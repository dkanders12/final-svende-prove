import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEstateById } from "../../providers/fetchId"; // Assume you have a function to fetch estate by ID

const EstateDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEstateById(id); // Fetch estate details by ID
      setEstate(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!estate) return <div>Estate not found</div>;

  const {
    address,
    price,
    num_rooms,
    ground_space,
    estate_image_rel,
    estate_types,
    cities,
    energy_labels,
  } = estate || {};

  const primaryImage = estate_image_rel?.[0]?.images?.image_url;

  return (
    <div className="estate-detail">
      {primaryImage && <img src={primaryImage} alt={address} />}
      <h2>{address}</h2>
      <p>Type: {estate_types?.name}</p>
      <p>
        {num_rooms} værelser, {ground_space} m²
      </p>
      <p>Price: {price ? `${price.toLocaleString()} DKK` : "N/A"}</p>
      <p>
        City: {cities?.name}, {cities?.zipcode}
      </p>
      <p>Energy Label: {energy_labels?.letter}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default EstateDetail;
