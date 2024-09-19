import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchEstatesWithTypeAndImages } from "../../providers/Estates"; // Adjust the path
import "./BoligCards.scss";

const BoligCards = () => {
  const [Bolig, setBolig] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState(""); // State for the selected sort option
  const [filterOption, setFilterOption] = useState(""); // State for the selected filter option

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEstatesWithTypeAndImages();
      if (data) {
        setBolig(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Sorting function
  const sortEstates = (estates) => {
    switch (sortOption) {
      case "price_asc":
        return estates.sort((a, b) => a.price - b.price); // Sort by price (ascending)
      case "price_desc":
        return estates.sort((a, b) => b.price - a.price); // Sort by price (descending)
      case "size":
        return estates.sort((a, b) => b.ground_space - a.ground_space); // Sort by size (descending)
      case "rooms":
        return estates.sort((a, b) => b.num_rooms - a.num_rooms); // Sort by number of rooms (descending)
      default:
        return estates; // Default, no sorting
    }
  };

  // Filter function
  const filterEstates = (estates) => {
    if (!filterOption) return estates; // No filter selected
    return estates.filter(
      (estate) => estate.estate_types?.name === filterOption // Match estate type
    );
  };

  if (loading) return <div>Loading...</div>;

  // Check if Bolig array contains valid data
  if (!Bolig || Bolig.length === 0) {
    return <div>No data available</div>;
  }

  // First filter, then sort
  const filteredBolig = filterEstates([...Bolig]);
  const sortedBolig = sortEstates(filteredBolig);

  return (
    <>
      {" "}
      <article className="sorting">
        <h1>Boliger</h1>
        <div id="sorting-right">
          <div
            className="filter-options"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <h3 htmlFor="filter">Vælg filter:</h3>
            <select id="filter">
              <option value="">Vælg filter</option>
              <option value="Villa">Villa</option>
              <option value="Ejerlejlighed">Ejerlejlighed</option>
              <option value="Andelsbolig">Andelsbolig</option>
            </select>
          </div>

          <div
            className="sorting-options"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <h3 htmlFor="sort">Sorter:</h3>
            <select id="sort">
              <option value="">Vælg sortering</option>
              <option value="price_asc">Pris - Stigende</option>
              <option value="price_desc">Pris - Faldende</option>
              <option value="size">Antal kvadratmeter</option>
              <option value="rooms">Antal værelser</option>
            </select>
          </div>
        </div>
      </article>
      <div className="BoligCards-container">
        {/* Filter Dropdown */}

        {sortedBolig.map((estate) => (
          <BoligCardsL key={estate.id} estate={estate} />
        ))}
      </div>
    </>
  );
};

const BoligCardsL = ({ estate }) => {
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
  } = estate || {}; // Ensure `estate` is defined

  // Check if there are images and get the first one, if available
  const primaryImage = estate_image_rel?.[0]?.images?.image_url;

  return (
    <div className="bolig-card">
      <Link to={`/estate/${id}`} className="card-link">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={address || "No address"}
            className="bolig-image"
          />
        ) : (
          <p>No image available</p> // Display this message if no image URL is found
        )}
        <div className="bolig-details">
          <h3>{address || "No address available"}</h3>
          <div id="city">
            <p>{cities?.zipcode || "No zipcode"}</p>
            <p>{cities?.name || "No city name"}</p>
          </div>
          <p>{estate_types?.name || "No type available"}</p>
          <p>
            {num_rooms ? `${num_rooms} værelser` : "No rooms"} ,{" "}
            {ground_space ? `${ground_space} m²` : "No space"}
          </p>
          <i id="energy">{energy_labels?.letter || "No energy label"}</i>
          <p className="bolig-price">
            {price ? `${price.toLocaleString()} DKK` : "No price available"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BoligCards;
