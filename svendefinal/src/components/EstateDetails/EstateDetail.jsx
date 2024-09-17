import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEstateById } from "../../providers/fetchId";
import icon1 from "../../assets/Details/Property1.png";
import icon2 from "../../assets/Details/Property2.png";
import icon3 from "../../assets/Details/Property3.png";
import icon4 from "../../assets/Details/Property4.png";
import "./EstateDetail.scss";
const EstateDetail = () => {
  const { id } = useParams(); // Get the estate ID from the URL
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEstateById(id); // Fetch the estate details by ID
      setEstate(data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!estate) return <div>Estate not found</div>;

  const {
    id: estateId,
    address,
    price,
    payout,
    gross,
    net,
    cost,
    num_floors,
    num_rooms,
    floor_space,
    ground_space,
    basement_space,
    year_construction,
    year_rebuilt,
    description,
    num_clicks,
    floorplan,
    employee_id,
    estate_types,
    cities,
    estate_image_rel,
    energy_labels,
  } = estate || {};

  const primaryImage = estate_image_rel?.[0]?.images?.image_url;

  return (
    <section className="estate-detail">
      <article>
        {primaryImage && (
          <img src={primaryImage} alt={address} className="primary-image" />
        )}
        <div className="top-details">
          <div className="small-fixing">
            <div className="top-left-details">
              <h1>{address}</h1>
              <p>
                {cities?.zipcode},{cities?.name}
              </p>
              <div>
                <p>{estate_types?.name}</p>
                <p>{num_rooms} vær</p>
                <p>{floor_space} m²</p>
              </div>
              <p> set {num_clicks} gange</p>
            </div>
            <div className="top-middle-details">
              <img src={icon2} alt="" />
              <img src={icon1} alt="" />
              <img src={icon3} alt="" />
              <img src={icon4} alt="" />
            </div>
            <div className="top-right-details">
              <div>
                <p>Kontantpris:</p>{" "}
                <h1>{price ? `${price.toLocaleString()} DKK` : "N/A"}</h1>
              </div>
              <p>
                Udbetaling:
                {payout ? `${payout.toLocaleString()} DKK` : "N/A"}
              </p>{" "}
              <p>
                Ejerudgift per måned:
                {gross ? `${gross.toLocaleString()} DKK` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className="estate-info">
        <div className="small-info">
          <ul>
            <li>Sagsnr.</li>
            <li>Boligareal</li>
            <li>Grundareal</li>
            <li>Antal rum</li>
            <li>Antal plan</li>
          </ul>
          <ul>
            <li>{estateId}</li>
            <li>{floor_space} m²</li>
            <li>{ground_space} m²</li>
            <li>{num_rooms}</li>
            <li>{num_floors}</li>
          </ul>
        </div>
        <div className="small-info">
          <ul>
            <li>Kælder</li>
            <li>Byggeår</li>
            <li>Ombygget</li>
            <li>Energimærke</li>
            <li>Liggetid</li>
          </ul>
          <ul>
            <li>{basement_space}m²</li>
            <li>{year_construction} </li>
            <li>{year_rebuilt}</li>
            <li>{energy_labels?.letter}</li>
            <li>40 dage</li>
          </ul>
        </div>
        <div className="small-info">
          <ul>
            <li>Kontantpris</li>
            <li>Udbetaling</li>
            <li>Brutto ex. ejerudgift</li>
            <li>Netto ex. ejerudgift</li>
            <li>Ejerudgift</li>
          </ul>
          <ul>
            <li>{price}</li>
            <li>{payout} </li>
            <li>{gross}</li>
            <li>{net}</li>
            <li>{cost}</li>
          </ul>
        </div>
      </article>
      <article className="text-container">
        <div className="main-text">
          <ul>
            <li>Elegant og herskabelig bolig opført i 1927</li>
            <li>Højloftede stuer med originale detaljer</li>
            <li>Spisekøkken fra Unoform med terrasseudgang</li>
            <li>Stor 1. sal med fire værelser og et badeværelse</li>
            <li>Evt. mulighed for at drive liberalt erhverv</li>
            <li>Eftertragtet beliggenhed i Indre Hasseris</li>
            <li>Nyanlagt terrasse</li>
            <li>Gåafstand til by, skoler og butikker</li>
          </ul>
          <p>{description}</p>
        </div>
        <div className="employee-info">
          <h3>Contact Information</h3>
          {employee_id && (
            <>
              <img
                src={employee_id.image_url}
                alt={employee_id.firstname}
                className="employee-image"
              />
              <p>
                {employee_id.firstname} {employee_id.lastname}
              </p>
              <p>{employee_id.position}</p>
              <p>{employee_id.phone}</p>
              <p>{employee_id.email}</p>
            </>
          )}
        </div>
      </article>
    </section>
  );
};

export default EstateDetail;
