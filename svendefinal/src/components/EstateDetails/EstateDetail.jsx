import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEstateById } from "../../providers/fetchId";
import icon1 from "../../assets/Details/Property1.png";
import icon2 from "../../assets/Details/Property2.png";
import icon3 from "../../assets/Details/Property3.png";
import icon4 from "../../assets/Details/Property4.png";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./EstateDetail.scss";

// Import af React og nødvendige moduler og hooks (useState og useEffect).
// useParams bruges til at hente URL parametre, og fetchEstateById er en asynkron funktion, der henter ejendomsdata fra et API.
// Her ser vi også imports af ikoner og stilark.

const EstateDetail = () => {
  const { id } = useParams(); // Henter ejendoms ID fra URL (datatype: string)
  const [estate, setEstate] = useState(null); // useState hook til at håndtere ejendomsdata (datatype: object)
  const [loading, setLoading] = useState(true); // useState til at håndtere loading state (datatype: boolean)
  const [activeView, setActiveView] = useState(); // useState til at styre aktiv visning af billede eller plantegning (datatype: string)

  // useEffect bruges til at køre side-effekter (som API kald) når komponenten bliver mounted eller når ID ændres
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEstateById(id); // Promise der venter på ejendomsdata (API-kald)
      setEstate(data); // Opdaterer state med data fra API'et (spread operatør kunne bruges til at kopiere objekter)
      setLoading(false); // Når data er hentet, stopper vi loading state
    };

    fetchData(); // Kalder fetchData når komponenten loader første gang
  }, [id]); // Afhængigheden id sikrer, at effekten kører igen, hvis id ændrer sig (condition).

  // Betingelser (conditions) til at vise forskellige UI elementer baseret på state
  if (loading) return <div>Loading...</div>; // Hvis loading er true, vises "Loading"
  if (!estate) return <div>Estate not found</div>; // Hvis ingen ejendom er fundet, vises "Estate not found"

  // Destrukturering af ejendomsobjektet for nemmere adgang til datafelter (spread operatør kunne bruges her)
  const {
    id: estateId, // Template strings bruges til at give værdierne læsbarhed
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
  } = estate || {}; // Hvis estate er null, returneres et tomt objekt

  // Brug af optional chaining operator (?.) til at undgå fejl, hvis billeder eller andre data ikke er til stede
  const primaryImage = estate_image_rel?.[0]?.images?.image_url;

  // Funktion til at bestemme hvilket indhold der skal vises afhængigt af activeView (betingelse - switch statement)
  const renderContent = () => {
    switch (activeView) {
      case "image":
        return (
          <img
            src={primaryImage || "https://via.placeholder.com/600"}
            alt="House"
            className="detail-image"
          />
        );
      case "floor_plan":
        return (
          <img
            src={floorplan || "https://via.placeholder.com/600"} // Template strings brugt her
            alt="Floor Plan"
            className="detail-image"
          />
        );
      case "map":
        return (
          <img
            src="https://via.placeholder.com/600"
            alt="Map"
            className="detail-image"
          />
        );
      default:
        return null; // Returnerer ingenting, hvis ingen aktiv visning er valgt
    }
  };

  return (
    <section className="estate-detail">
      <article>
        {/* Conditional rendering af primært billede */}
        {primaryImage && (
          <img src={primaryImage} alt={address} className="primary-image" />
        )}
        <div className="top-details">
          <div className="small-fixing">
            <div className="top-left-details">
              <h1>{address}</h1>
              <p>
                {cities?.zipcode}, {cities?.name}
              </p>
              <div>
                <p>{estate_types?.name}</p>
                <p>{num_rooms} vær</p>
                <p>{floor_space} m²</p>
              </div>
              <p>Set {num_clicks} gange</p>{" "}
              {/* Template string bruges her til at formatere tekst */}
            </div>
            <div className="top-middle-details">
              {/* Iterationer - mapping gennem ikoner */}
              <img
                src={icon2}
                alt="Floor Plan"
                onClick={() => setActiveView("image")} // Funktionel operatør bruges her
              />{" "}
              <img
                src={icon1}
                alt="House"
                onClick={() => setActiveView("floor_plan")}
              />
              <img src={icon3} alt="Map" onClick={() => setActiveView("map")} />
              <img src={icon4} alt="Favorite" />
            </div>

            <div className="top-right-details">
              <div>
                <p>Kontantpris:</p>
                <h1>{price ? `${price.toLocaleString()} DKK` : "N/A"}</h1>{" "}
                {/* Template string til formatering */}
              </div>
              <p>
                Udbetaling: {payout ? `${payout.toLocaleString()} DKK` : "N/A"}
              </p>
              <p>
                Ejerudgift per måned:{" "}
                {gross ? `${gross.toLocaleString()} DKK` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className="estate-info">
        {/* Iteration - rendering af listeelementer for ejendomsdetaljer */}
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
          <h3>Kontaktinformation</h3>
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
      </article>{" "}
      {/* Conditional rendering af content baseret på activeView */}
      {activeView && (
        <div className="content-display">
          {renderContent()} {/* Renderer indhold afhængigt af activeView */}
          <IoMdCloseCircleOutline
            className="close-button"
            onClick={() => setActiveView(null)} // Lukker visningen ved klik
          />
        </div>
      )}
    </section>
  );
};

export default EstateDetail;
