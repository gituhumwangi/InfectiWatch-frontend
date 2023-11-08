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

function Diseases() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts (initially)
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://127.0.0.1:5000/diseases`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Disease not found");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filteredData with all data
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const tableRows = (filteredData || []).map((disease, index) => (
    <tr key={index}>
      <td>{disease.disease_name}</td>
      <td>{disease.description || "No data available"}</td>
      <td>{disease.prevention || "No data available"}</td>
      <td>{disease.symptoms || "No data available"}</td>
      <td>{disease.treatment || "No data available"}</td>
      {/* <td>{disease.noOfCases || "No data available"}</td> */}
    </tr>
  ));

  return (
    <div className="diseases-container">
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
              {/* <th>Number of Cases</th> */}
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Diseases;

