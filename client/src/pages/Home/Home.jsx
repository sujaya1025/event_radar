import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="title"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        EVENT RADAR - YOUR EVENT FINDER
      </motion.h1>

      <motion.p 
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Find exciting events or add your own!
      </motion.p>

      <motion.button
        onClick={() => navigate("/display")}
        className="start-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default Home;
