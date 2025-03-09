import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const token = localStorage.getItem("authToken");

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/events">Events</Link>
          <LogoutButton />
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
