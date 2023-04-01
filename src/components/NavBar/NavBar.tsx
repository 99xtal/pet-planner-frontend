import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { SubmitButton } from '../buttons';
import styles from './NavBar.module.scss';

const Navbar = () => {
	const { logoutUser } = useContext(AuthContext);
  
	return (
		<div className={styles.navBar}>
			<ul className={styles.navBar__list}>
				<li className={styles.navBar__listItem}>
					<Link
						to="/dashboard"
						className={styles.navBar__logo}
					>
            petPal
					</Link>
				</li>
				<li>
					<SubmitButton onClick={logoutUser}>Logout</SubmitButton>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
