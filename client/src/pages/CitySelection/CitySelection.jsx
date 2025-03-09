import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CitySelection.css"; 

const CitySelection = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedCity) {
      localStorage.setItem("selectedCity", selectedCity);
      navigate("/role-selection");
    } else {
      alert("Please select a city before proceeding.");
    }
  };

  const cities = [
    "Ahmedabad", "Bangalore", "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai",
    "Coimbatore", "Delhi", "Dehradun", "Faridabad", "Ghaziabad", "Guwahati",
    "Hyderabad", "Indore", "Jaipur", "Jalandhar", "Jamshedpur", "Kanpur",
    "Kochi", "Kolkata", "Lucknow", "Ludhiana", "Mangalore", "Mumbai",
    "Mysore", "Nagpur", "Nashik", "Noida", "Patna", "Pune", "Raipur",
    "Rajkot", "Ranchi", "Surat", "Thane", "Thiruvananthapuram", "Udaipur",
    "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam"
  ];

  return (
    <motion.div 
      className="city-selection-container d-flex justify-content-center align-items-center vh-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="city-selection-card p-4 shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center fw-bold text-light">Select Your City</h2>
        <div className="mb-3">
          <label className="form-label text-light">Choose a City</label>
          <select
            className="form-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            required
          >
            <option value="">-- Choose a City --</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <motion.button 
          className="btn btn-primary w-100"
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CitySelection;
