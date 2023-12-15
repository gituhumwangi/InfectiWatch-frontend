import React, { useEffect, useState } from "react";
import "./Diseases.css"; // Import the CSS file
import axios from "axios";
import NavBar from "./NavBar";


function Diseases() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:5000/diseases", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5OTU2MDgwNywianRpIjoiNzQ5NTkzNTAtOTMyZS00NzA1LWFmYTQtYWE5NzE5NmZhMjg5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MjEsInVzZXJuYW1lIjoibWFydG8ifSwibmJmIjoxNjk5NTYwODA3LCJleHAiOjE2OTk1NjQ0MDd9.PXd8Z2pG9oyDvcUkrbu32rc4TdJBtB2sbC8X9BKE4yE`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching disease data: ", error);
      });
  };
  

  const tableRows = (data || []).map((disease, index) => (
    <tr key={index}>
      <td>{disease.disease_name}</td>
      <td>{disease.description || "No data available"}</td>
      <td>{disease.prevention || "No data available"}</td>
      <td>{disease.symptoms || "No data available"}</td>
      <td>{disease.treatment || "No data available"}</td>
    </tr>
  ));

  return (
    <div className="diseases-container">
        <NavBar />
      <h1>Disease Information</h1>
      <div className="disease-info">
        <table>
          <thead>
            <tr>
              <th>Disease</th>
              <th>Description</th>
              <th>Prevention</th>
              <th>Symptoms</th>
              <th>Treatment</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Diseases;
