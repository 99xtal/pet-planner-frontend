// General Imports
import React from "react";
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
import useAxiosGet from "./hooks/useAxiosGet";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [pets, isLoading] = useAxiosGet("http://127.0.0.1:8000/api/pets/");

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
