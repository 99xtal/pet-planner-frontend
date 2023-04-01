import React from 'react';
import styles from './PasswordInput.module.scss';

const PasswordInput = (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
	return (
		<input
			type="password"
			className={styles.input}
			{...props}
		/>
	);
};

export default PasswordInput;