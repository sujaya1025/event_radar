import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import './CitySelection.css';

const defaultCities = [
  "Delhi", "Mumbai", "Bangalore", "Kolkata", "Chennai", "Hyderabad", "Ahmedabad",
  "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
  "Chandigarh", "Bhopal", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra",
  "Nashik", "Faridabad", "Meerut", "Rajkot", "Kochi", "Coimbatore", "Vijayawada",
  "Madurai", "Kozhikode", "Jammu", "Varanasi", "Aurangabad", "Dhanbad", "Srinagar",
  "Ranchi", "Howrah", "Gwalior", "Bhubaneswar", "Amritsar", "Mysore", "Bikaner",
  "Udaipur", "Gurgaon", "Noida", "Shimla", "Jodhpur", "Belgaum", "Mangalore",
  "Solapur", "Kakinada", "Cuttack", "Tirunelveli", "Guntur", "Warangal", "Nellore",
  "Tirupati", "Rajahmundry", "Eluru", "Vizianagaram", "Anantapur", "Kadapa",
  "Karimnagar", "Nizamabad", "Kurnool", "Machilipatnam", "Ongole", "Srikakulam"
];

const CitySelection = () => {
  const [cities, setCities] = useState(defaultCities);
  const [selectedCity, setSelectedCity] = useState(null);
  const [otherCity, setOtherCity] = useState("");
  const [useOther, setUseOther] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities && Array.isArray(savedCities)) {
      setCities(savedCities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const cityOptions = cities.map((city) => ({
    label: city,
    value: city
  }));

  cityOptions.push({ label: "Other", value: "Other" });

  const handleCitySelection = () => {
    const cityToUse = useOther ? otherCity.trim() : selectedCity?.value;

    if (!cityToUse) return;

    if (useOther && !cities.includes(cityToUse)) {
      setCities([...cities, cityToUse]);
    }

    localStorage.setItem("selectedCity", cityToUse);
    navigate("/dashboard");
  };

  return (
    <div className="city-container">
      <div className="city-card">
        <h2 className="city-title">Select Your City</h2>

        <div className="form-group mb-3">
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={(option) => {
              setUseOther(option.value === "Other");
              setSelectedCity(option);
            }}
            className="city-dropdown"
            placeholder="Choose a city..."
            isSearchable
          />
        </div>

        {useOther && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your city"
              value={otherCity}
              onChange={(e) => setOtherCity(e.target.value)}
            />
          </div>
        )}

        <button
          className="btn btn-primary w-100"
          onClick={handleCitySelection}
          disabled={useOther ? !otherCity.trim() : !selectedCity}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CitySelection;
