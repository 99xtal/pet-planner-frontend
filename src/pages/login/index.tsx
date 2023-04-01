import React from 'react';
import { Link } from 'react-router-dom';

import { WidgetBorder } from '../../components/borders';
import { LoginForm } from '../../components/forms';

import styles from './styles.module.scss';

const LoginPage = () => {
	return (
		<main className={styles.main}>
			<h1 className={styles.logo__title}>petPal</h1>
			<h3 className={styles.logo__subtitle}>An all-in-one pet planner</h3>
			<WidgetBorder>
				<div className={styles.login}>
					<LoginForm />
					<Link className={styles.login__buttonsLink} to="/register">Create an account</Link>
				</div>
			</WidgetBorder>
		</main>
	); 
};

export default LoginPage;
