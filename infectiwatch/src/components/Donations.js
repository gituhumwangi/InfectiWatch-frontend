import React, { useState, useEffect } from "react";
import "./Donations.css"; // Import your CSS file for custom styles
import NavBar from "./NavBar";

function Donations() {
  const [donation, setDonation] = useState(0);
  const [individualDonations, setIndividualDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    // Fetch individual donations from the backend when the component mounts
    fetch("http://127.0.0.1:5000/donations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch individual donations");
        }
        return res.json();
      })
      .then((data) => {
        setIndividualDonations(data);
        // Calculate the total donations from individual donations
        const total = data.reduce((acc, donation) => acc + donation.amount, 0);
        setTotalDonations(total);
      })
      .catch((error) => {
        console.error("Error fetching individual donations:", error);
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
      .then((newDonation) => {
        // Donation was successful, update the individual and total donations
        setIndividualDonations([...individualDonations, newDonation]);
        setTotalDonations(totalDonations + newDonation.amount);
        setDonation(0);
      })
      .catch((error) => {
        console.error("Error donating:", error);
      });
  };

  return (
    <div className="donations-container">
      <NavBar />
      <h2>Support Our Cause</h2>
      <p className="donation-statement">
        Your generous donation helps us make a difference in the world. Every contribution counts.
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
