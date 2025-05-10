import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CitySelection.css';

const cities = [
  "Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad", 
  "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
  "Chandigarh", "Bhopal", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", 
  "Nashik", "Faridabad", "Meerut", "Rajkot", "Kochi", "Coimbatore", "Vijayawada", 
  "Madurai", "Kozhikode", "Jammu", "Varanasi", "Aurangabad", "Dhanbad", "Srinagar",
  "Ranchi", "Howrah", "Gwalior", "Bhubaneswar", "Amritsar", "Mysore", "Bikaner",
  "Udaipur", "Gurgaon", "Noida", "Shimla", "Jodhpur", "Belgaum", "Mangalore", 
  "Solapur", "Kakinada", "Cuttack", "Tirunelveli"
];

const CitySelection = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  const handleCitySelection = () => {
    localStorage.setItem("selectedCity", selectedCity);
    navigate("/dashboard");
  };

  return (
    <div className="city-container">
      <div className="city-card">
        <h2 className="city-title">Select Your City</h2>
        <div className="form-group mb-4">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="form-select"
          >
            <option value="">Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleCitySelection}
          disabled={!selectedCity}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CitySelection;