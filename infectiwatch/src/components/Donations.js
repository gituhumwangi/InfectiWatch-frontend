import React, { useState, useEffect } from "react";
import "./Donations.css"; // Import your CSS file for custom styles

function Donations() {
  const [donation, setDonation] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    // Fetch total donations from the backend when the component mounts
    fetch("http://127.0.0.1:5000/donations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch total donations");
        }
        return res.json();
      })
      .then((data) => {
        setTotalDonations(data.totalDonations);
      })
      .catch((error) => {
        console.error("Error fetching total donations:", error);
      });
  }, []); // The empty dependency array ensures it runs only once

  const handleDonate = () => {
    // Update the backend with the new donation amount
    fetch("http://127.0.0.1:5000/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: parseFloat(donation) }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to donate");
        }
        return res.json();
      })
      .then(() => {
        // Donation was successful, update the total donations and reset the donation input
        setTotalDonations(totalDonations + parseFloat(donation));
        setDonation(0);
      })
      .catch((error) => {
        console.error("Error donating:", error);
      });
  };

  return (
    <div className="donations-container">
      <h2>Support Our Cause</h2>
      <p className="donation-statement">
        Your generous donation helps us make a difference in the world. Every
        contribution counts.
      </p>
      <div className="total-donations">
        Total Donations: ${totalDonations}
      </div>
      <div className="donation-input">
        <input
          type="number"
          placeholder="Enter donation amount"
          name="input"
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
        />
        <button className="donate-button" onClick={handleDonate}>
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default Donations;
