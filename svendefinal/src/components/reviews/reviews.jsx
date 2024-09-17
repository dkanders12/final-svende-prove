import React, { useState, useEffect } from "react";
import "./Reviews.scss"; // Your styles for the component
import { supabase } from "../../providers/LoginController"; // Import your Supabase client

const Reviews = () => {
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [randomReview, setRandomReview] = useState(null); // State for storing one random review
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if the user is logged in
  const [user, setUser] = useState(null); // User details from local storage
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
  });
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch reviews from Supabase
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews") // Ensure the table name is correct in Supabase
        .select("*")
        .order("created_at", { ascending: false }); // Order by most recent first

      if (error) {
        throw error;
      }

      setReviews(data); // Set the reviews in the state

      // Select a random review
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomReview(data[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Could not fetch reviews. Please try again later.");
    }
  };

  // Check if the user is logged in on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setIsAuthenticated(true);
      setUser(parsedUser);
    }

    // Fetch reviews when the component mounts
    fetchReviews();
  }, []);

  // Toggle the form visibility
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear previous success or error messages
    setError(null);
    setSuccess(null);

    try {
      // Submit data to the "reviews" table in Supabase
      const { data, error } = await supabase
        .from("reviews") // Ensure the table name is correct in Supabase
        .insert([
          {
            user_id: user.user_id, // Assuming the user_id is stored in local storage
            title: formValues.title, // Title input from the form
            content: formValues.content, // Content input from the form
            created_at: new Date().toISOString(), // Capture the current date and time
            is_active: true, // Set the review as active by default
          },
        ]);

      if (error) {
        throw error;
      }

      // Show success message
      setSuccess("Review submitted successfully!");

      // Reset the form after successful submission
      setFormValues({
        title: "",
        content: "",
      });

      // Refetch reviews after submission to update the list
      fetchReviews();
    } catch (error) {
      // Handle errors
      setError("An error occurred while submitting the review.");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="reviews-container">
      <h2>Det siger vores kunder</h2>

      {/* Display one random review */}
      <div className="existing-reviews">
        {randomReview ? (
          <div className="review">
            <strong>{randomReview.title || "Review"}</strong>
            <p>{randomReview.content}</p>
            <p>
              {randomReview.name || "Anonymous"},{" "}
              {new Date(randomReview.created_at).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Show the form only if the user is authenticated */}
      {isAuthenticated ? (
        <>
          <div id="long-width">
            <button className="toggle-form-button" onClick={toggleForm}>
              {showForm ? "Luk anmeldelsesformular" : "Skriv en anmeldelse"}
            </button>
          </div>
          {showForm && (
            <div className="review-form">
              <form onSubmit={handleSubmit}>
                <label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleInputChange}
                    placeholder="navn"
                    required
                  />
                </label>
                <label>
                  <textarea
                    name="content"
                    value={formValues.content}
                    onChange={handleInputChange}
                    placeholder="Skriv din anmeldelse"
                    required
                  ></textarea>
                </label>
                <button id="fixbtn" type="submit">
                  Send
                </button>
              </form>

              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
            </div>
          )}
        </>
      ) : (
        <p>Du skal være logget ind for at skrive en anmeldelse.</p>
      )}
    </div>
  );
};

export default Reviews;
