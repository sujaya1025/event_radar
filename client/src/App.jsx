import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CitySelection from "./pages/CitySelectiion";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import ViewEvents from "./pages/ViewEvents";
import Navbar from "./components/Navbar";
import MyEvents from "./pages/MyEvents";
import EditEventForm from "./pages/EditEventForm";
function AppContent() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  // Pages where we don't want Navbar
  const noNavbarPaths = ['/', '/login', '/register'];

  const shouldShowNavbar = isLoggedIn && !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/city-selection" element={<CitySelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/edit-event/:id" element={<EditEventForm />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
