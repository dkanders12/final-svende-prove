import React, { useState, useEffect } from "react";
import { supabase } from "../../providers/LoginController";
import "./AdminPanel.scss";
// Importerer React, og de nødvendige hooks useState og useEffect fra React biblioteket.
// supabase bliver brugt til at interagere med databasen, og AdminPanel.scss er til styling.
// dependency
const AdminPanel = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [newReviewText, setNewReviewText] = useState("");
  const [newContentText, setNewContentText] = useState("");
  // useState hooks bruges til at holde styr på reviews, hvilken review der bliver redigeret, og indholdet af review.
  //hooks
  // Henter alle reviews fra Supabase databasen, når komponenten loader.
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase.from("reviews").select("*");
      if (error) {
        console.error("Fejl ved hentning af reviews:", error);
      } else {
        setReviews(data);
        // Hvis der ikke er fejl, sætter den reviews dataen til state.
      }
    };
    //hooks

    fetchReviews();
  }, []);
  //dependency Array
  // useEffect kører kun én gang, når komponenten mountes, for at hente reviews fra databasen.

  // Funktion til at slette et review ved at bruge review id
  const handleDelete = async (id) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    //promises
    if (error) {
      console.error("Fejl ved sletning af review:", error);
    } else {
      setReviews(reviews.filter((review) => review.id !== id));
      // Filtrerer det slettede review ud af state, så UI opdateres.
    }
    //conditions
  };

  // Funktion til at opdatere et review med nyt tekstindhold og dato
  const handleUpdate = async (id) => {
    const newCreatedAt = new Date().toISOString();
    // Får den nuværende dato og tid i ISO-format.

    const { error } = await supabase
      .from("reviews")
      .update({
        title: newReviewText,
        content: newContentText,
        created_at: newCreatedAt,
      })
      .eq("id", id);
    // Opdaterer det review, som matcher id, med nye værdier for titel, indhold og dato.

    if (error) {
      console.error("Fejl ved opdatering af review:", error);
    } else {
      setReviews(
        reviews.map((review) =>
          //iterations
          review.id === id
            ? {
                ...review,
                title: newReviewText,
                content: newContentText,
                created_at: newCreatedAt,
              }
            : review
        )
        // Hvis opdateringen er succesfuld, opdateres reviews i state og redigeringsmode afsluttes.
      );
      setEditingReview(null);
    }
  };

  return (
    <article className="admin-panel">
      <h2>Admin Panel - Manage Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {editingReview === review.id ? (
              <>
                <input
                  type="text"
                  value={newReviewText}
                  placeholder="Redigér titel"
                  onChange={(e) => setNewReviewText(e.target.value)}
                />
                {/* Inputfelt til at redigere titlen på et review. */}

                <textarea
                  value={newContentText}
                  placeholder="Redigér indhold"
                  onChange={(e) => setNewContentText(e.target.value)}
                />
                {/* Tekstfelt til at redigere indholdet af et review. */}
              </>
            ) : (
              /*ternary oprator */
              <>
                <div className="middle-admin">
                  <span>{review.title}</span>
                  <br />
                  <span>
                    {new Date(review.created_at).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {/* Viser titlen og datoen for hvornår reviewet blev oprettet i et læsbart format. */}
                </div>
              </>
            )}
            <div className="buttons">
              <button
                className="red-btn"
                onClick={() => handleDelete(review.id)}
              >
                Slet
              </button>
              {/* Knap til at slette et review */}

              {editingReview === review.id ? (
                <button onClick={() => handleUpdate(review.id)}>Gem</button>
              ) : (
                // Hvis review er i redigeringstilstand, viser den en gem-knap for at opdatere reviewet.
                <button
                  className="save-btn"
                  onClick={() => {
                    setEditingReview(review.id);
                    setNewReviewText(review.title);
                    setNewContentText(review.content);
                  }}
                >
                  Redigér
                </button>
                // Hvis review ikke er i redigeringstilstand, viser den en redigeringsknap.
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default AdminPanel;
