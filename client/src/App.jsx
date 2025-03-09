import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Display from "./pages/Display/Display";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CitySelection from "./pages/CitySelection/CitySelection";
import RoleSelection from "./pages/RoleSelection/RoleSelection";
import ViewEvents from "./pages/ViewEvents/ViewEvents";
import CreateEvent from "./pages/CreateEvent/CreateEvent";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/display" element={<Display />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="city-selection" element={<CitySelection/>}/>
          <Route path="role-selection" element = {<RoleSelection/>}/>
          <Route path="view-events" element = {<ViewEvents/>}/>
          <Route path="create-event" element={<CreateEvent/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
