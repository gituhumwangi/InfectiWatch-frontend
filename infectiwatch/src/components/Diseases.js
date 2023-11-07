import React, { useEffect, useState } from "react";
import "./Diseases.css";

function Diseases() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // Fetch data when the component mounts (initially)
    fetchData();
    console.log(fetchData())
  }, []); // The dependency array should be empty to run the effect once.

  const fetchData = () => {
    
    
    fetch(`http://127.0.0.1:5000/diseases?search=${searchInput}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Disease not found");
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the form from submitting and page reloading
    fetchData();
    console.log(data)
  };

  return (
    <div className="diseases-container">
      <h1>Disease Information</h1>
      <p>Search for disease information:</p>
      <form>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Search
        </button>
      </form>
      <div className="disease-info">
        <div className="info-section">
          <h2>Description</h2>
          <p>{data ? data.description : "No data available"}</p>
        </div>
        <div className="info-section">
          <h2>Prevention</h2>
          <p>{data ? data.prevention : "No data available"}</p>
        </div>
        <div className="info-section">
          <h2>Symptoms</h2>
          <p>{data ? data.symptoms : "No data available"}</p>
        </div>
        <div className="info-section">
          <h2>Treatment</h2>
          <p>{data ? data.treatment : "No data available"}</p>
        </div>
        <div className="info-section">
          <h2>Number of Cases</h2>
          <p>{data ? data.noOfCases : "No data available"}</p>
        </div>
      </div>
    </div>
  );
}

export default Diseases;
