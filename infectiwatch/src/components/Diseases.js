import React, { useEffect, useState } from "react";
import "./Diseases.css";

function Diseases() {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
    // console.log(fetchData())
  }, []);

  // console.log("=====data", data)
  const fetchData = () => {
    console.log("Clicked")
    console.log("input", searchInput)
    // fetch(`http://127.0.0.1:5555/diseases?search=${searchInput}`)
      // .then(res => {
      //   if (!res.ok) {
      //     throw new Error("Disease not found")
      //   }
      //    return res.json() 
      //   })
      // .then(data => setData(data))
      // .catch(erro => console.log(erro))

    fetch(`http://127.0.0.1:5555/diseases?search=${searchInput}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Disease not found");
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleClick = () => {
    // e.preventDefault()
    fetchData();

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
