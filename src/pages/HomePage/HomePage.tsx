import React from 'react';

import Navbar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

import './HomePage.css';

const HomePage = () => {
	return (
		<div className="homepage">
			<header>
				<Navbar />
			</header>
			<div className="content">
				<nav>
					<SideBar />
				</nav>
				<main>
					<div className="page">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default HomePage;
