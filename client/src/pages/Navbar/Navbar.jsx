import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Event Radar</Link>

        <div className="ml-auto">
          {isAuthenticated ? (
            <>
              <Link className="btn btn-light mx-2" to="/dashboard">Dashboard</Link>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary mx-2" to="/login">Login</Link>
              <Link className="btn btn-success" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
