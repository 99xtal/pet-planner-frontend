// General Imports
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PetsPage from "./pages/PetsPage/PetsPage";
import PetPage from "./pages/PetPage/PetPage";

// Hook Imports
import useAuth from "./hooks/useAuth";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";

function App() {
  const [_, token] = useAuth();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/pets/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setPets(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchPets();
  }, [token]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage pets={pets} />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pets" element={<PetsPage />}>
            <Route
              path=":petId"
              element={<PetPage />}
              key={window.location.pathname}
            />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
