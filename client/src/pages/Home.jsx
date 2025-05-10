import { Link } from "react-router-dom";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const Home = () => {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={img1}
            alt="Image 1"
            className="d-block w-100"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={img2}
            alt="Image 2"
            className="d-block w-100"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={img3}
            alt="Image 3"
            className="d-block w-100"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={img4}
            alt="Image 4"
            className="d-block w-100"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <h1 className="text-white display-3 fw-bold mb-4" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
          EVENT RADAR
        </h1>
        <div className="d-flex justify-content-center">
          <Link to="/register" className="btn btn-primary btn-lg me-3">Register</Link>
          <Link to="/login" className="btn btn-light btn-lg">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
