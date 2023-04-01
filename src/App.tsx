// General Imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages Imports
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import HomePage from './pages/HomePage/HomePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import PetsPage from './pages/PetsPage/PetsPage';
import PetPage from './pages/PetPage/PetPage';
import AddPetPage from './pages/AddPetPage/AddPetPage';

// Util Imports
import PrivateRoute from './utils/PrivateRoute';
import { DashboardProvider } from './context/DashboardContext';
import { PetsProvider } from './context/PetsContext';

function App() {
	return (
		<div className="app">
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<DashboardProvider>
								<PetsProvider>
									<HomePage />
								</PetsProvider>
							</DashboardProvider>
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
					<Route path="addpet" element={<AddPetPage />} />
					<Route path="settings" element={<SettingsPage />} />
				</Route>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;
