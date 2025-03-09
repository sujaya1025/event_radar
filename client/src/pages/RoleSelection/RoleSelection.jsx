import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./RoleSelection.css"; 

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("userRole", role);
    if (role === "organizer") {
      navigate("/create-event");
    } else {
      navigate("/view-events");
    }
  };

  return (
    <motion.div 
      className="role-selection-container d-flex justify-content-center align-items-center vh-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="role-selection-card p-4 shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-light fw-bold">Select Your Role</h2>
        <div className="d-flex justify-content-center mt-4">
          <motion.button
            className="btn attendee-btn mx-3"
            onClick={() => handleRoleSelect("attendee")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Attendee
          </motion.button>
          <motion.button
            className="btn organizer-btn"
            onClick={() => handleRoleSelect("organizer")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Organizer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoleSelection;
