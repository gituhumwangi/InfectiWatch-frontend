import React, { useState, useEffect } from "react";
import "./Review.css"; // Import your CSS file for custom styles

function Review() {
  const [review, setReview] = useState("");
  const [totalReviews, setTotalReviews] = useState([]);
  const [fetchingReviews, setFetchingReviews] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  function fetchReviews() {
    setFetchingReviews(true);
    fetch("http://127.0.0.1:5000/reviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch Reviews");
        }
        return res.json();
      })
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          setTotalReviews(data.reviews);
        } else {
          console.error("Reviews data is not in the expected format:", data);
        }
      })
      .catch((error) => {
        console.error("Error failed to fetch reviews:", error);
      })
      .finally(() => {
        setFetchingReviews(false);
      });
  }

  function submitReview() {
    fetch("http://127.0.0.1:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: review }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit review");
        }
        return res.json();
      })
      .then((newReview) => {
        setTotalReviews([...totalReviews, newReview]);
        setReview("");
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  }

  return (
    <div className="review-container">
      <h1 className="review-header">Reviews</h1>
      <p className="review-instructions">
        We would like to hear your thoughts on how to prevent this disease from affecting more people.
      </p>
      <p className="review-instructions">
        Write to us down below what you would like to see change.
      </p>
      <input
        type="text"
        placeholder="Enter your review"
        name="Review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="review-input"
      />
      <button onClick={submitReview} className="review-submit">
        Submit
      </button>
      <button onClick={fetchReviews} className="get-reviews" disabled={fetchingReviews}>
        Get Reviews
      </button>

      <table className="review-table">
        <thead>
          <tr>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {totalReviews.map((review, index) => (
            <tr key={index}>
              <td>{review.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Review;
