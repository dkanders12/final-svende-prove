import React, { useState, useEffect } from "react";
import { supabase } from "../../providers/LoginController"; // Adjust the path as needed
import "./AdminPanel.scss";

const AdminPanel = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [newReviewText, setNewReviewText] = useState("");
  const [newContentText, setNewContentText] = useState("");
  const [newTimeText, setNewTimeText] = useState(""); // State for new created_at timestamp

  // Fetch all reviews from the database
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase.from("reviews").select("*");
      if (error) {
        console.error("Error fetching reviews:", error);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, []);

  // Handle delete review
  const handleDelete = async (id) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      console.error("Error deleting review:", error);
    } else {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  // Handle update review
  const handleUpdate = async (id) => {
    // Generate a new timestamp for the created_at field
    const newCreatedAt = new Date().toISOString(); // Current date and time in ISO format

    const { error } = await supabase
      .from("reviews")
      .update({
        title: newReviewText, // Update title
        content: newContentText, // Update content
        created_at: newCreatedAt, // Update created_at with the new time
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating review:", error);
    } else {
      // Update local state after successful update
      setReviews(
        reviews.map((review) =>
          review.id === id
            ? {
                ...review,
                title: newReviewText,
                content: newContentText,
                created_at: newCreatedAt, // Update the state with the new time
              }
            : review
        )
      );
      setEditingReview(null); // Stop editing mode
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
                  placeholder="Edit title"
                  onChange={(e) => setNewReviewText(e.target.value)}
                />

                <textarea
                  value={newContentText}
                  placeholder="Edit content"
                  onChange={(e) => setNewContentText(e.target.value)}
                />
              </>
            ) : (
              <>
                <div className="middle-admin">
                  <span> {review.title}</span>
                  <br />
                  <span>
                    {new Date(review.created_at).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </>
            )}
            <div className="buttons">
              <button
                className="red-btn"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
              {editingReview === review.id ? (
                <button onClick={() => handleUpdate(review.id)}>Save</button>
              ) : (
                <button
                  className="save-btn"
                  onClick={() => {
                    setEditingReview(review.id);
                    setNewReviewText(review.title); // Pre-fill title for editing
                    setNewContentText(review.content); // Pre-fill content for editing
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default AdminPanel;
