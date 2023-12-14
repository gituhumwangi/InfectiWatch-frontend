// import React, { useEffect, useState } from "react";
// import "./Diseases.css";

// function Diseases() {
//   const [data, setData] = useState(null);
//   const [searchInput, setSearchInput] = useState("");
//   const [filteredData, setFilteredData] = useState(null);
//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: "ascending",
//   });

//   useEffect(() => {
//     // Fetch data when the component mounts (initially)
//     fetchData();
//     console.log(fetchData())
//   }, []);

//   useEffect(() => {
//     // Update filteredData whenever data or searchInput changes
//     if (data) {
//       // console.log(data)
//       const filtered = data.filter((disease) =>
//         disease.name.toLowerCase().includes(searchInput.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   }, [data, searchInput]);

//   const fetchData = () => {
//     fetch(`http://127.0.0.1:5000/diseases`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Disease not found");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         // console.log(data)
//         setData(data);
//         console.log(setData(data))
//         setFilteredData(data); // Initialize filteredData with all data
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (data) {
//       const filtered = data.filter((disease) =>
//         disease.name.toLowerCase().includes(searchInput.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   };

//   const handleSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });

//     const sortedData = [...filteredData];
//     sortedData.sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === "ascending" ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === "ascending" ? 1 : -1;
//       }
//       return 0;
//     });

//     setFilteredData(sortedData);
//   };

//   const tableRows = (filteredData || []).map((disease, index) => (
//     <tr key={index}>
//       <td>{disease.name}</td>
//       <td>{disease.description || "No data available"}</td>
//       <td>{disease.prevention || "No data available"}</td>
//       <td>{disease.symptoms || "No data available"}</td>
//       <td>{disease.treatment || "No data available"}</td>
//       <td>{disease.noOfCases || "No data available"}</td>
//     </tr>
//   ));

//   return (
//     <div className="diseases-container">
//       <h1>Disease Information</h1>
//       <p>Search for disease information:</p>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search..."
//           name="search"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//       <div className="disease-info">
//         <table>
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("name")}>Disease</th>
//               <th onClick={() => handleSort("description")}>Description</th>
//               <th onClick={() => handleSort("prevention")}>Prevention</th>
//               <th onClick={() => handleSort("symptoms")}>Symptoms</th>
//               <th onClick={() => handleSort("treatment")}>Treatment</th>
//               <th onClick={() => handleSort("noOfCases")}>Number of Cases</th>
//             </tr>
//           </thead>
//           <tbody>{tableRows}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Diseases;
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
