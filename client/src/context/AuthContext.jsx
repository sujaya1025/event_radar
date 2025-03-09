// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [selectedCity, setSelectedCity] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedCity = localStorage.getItem("selectedCity");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setIsAuthenticated(true);
//     }

//     if (storedCity) {
//       setSelectedCity(storedCity);
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     setSelectedCity(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("selectedCity");
//   };

//   const selectCity = (city) => {
//     setSelectedCity(city);
//     localStorage.setItem("selectedCity", city);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, selectedCity, selectCity, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem("selectedCity") || null;
  });

  const isAuthenticated = !!user; 
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("selectedCity", selectedCity);
    } else {
      localStorage.removeItem("selectedCity");
    }
  }, [selectedCity]);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setSelectedCity(null);
  };

  // Select city function
  const selectCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, selectedCity, selectCity, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
