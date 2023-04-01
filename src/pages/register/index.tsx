import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SubmitButton } from '../../components/buttons';
import { PasswordInput, TextInput } from '../../components/input';

import Widget from '../../components/Widget/Widget';
import AuthContext from '../../context/AuthContext';
import useCustomForm from '../../hooks/useCustomForm';

import './RegisterPage.css';

const RegisterPage = () => {
	const { registerUser } = useContext(AuthContext);
	const defaultValues = {
		username: '',
		email: '',
		password: '',
		first_name: '',
		last_name: '',
	};
	const { formData, handleInputChange, handleSubmit } = useCustomForm(
		defaultValues,
		registerUser
	);

	return (
		<div className="register__body">
			<Widget title="New Account">
				<form onSubmit={handleSubmit}>
					<div className="register__form">
						<TextInput 
							name="username"
							placeholder='Username'
							value={formData.username}
							onChange={handleInputChange}
						/>
						<TextInput 
							name="firstName"
							placeholder='First Name'
							value={formData.first_name}
							onChange={handleInputChange}
						/>
						<TextInput 
							name="lastName"
							placeholder='Last Name'
							value={formData.last_name}
							onChange={handleInputChange}
						/>
						<TextInput 
							name="email"
							placeholder='Email'
							value={formData.email}
							onChange={handleInputChange}
						/>
						<PasswordInput
							placeholder="Password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
						/>
						<p style={{ fontSize: '12px' }}>
              NOTE: Make this an uncommon password with characters, numbers, and
              special characters!
						</p>
						<div className="register__buttons">
							<SubmitButton>Register!</SubmitButton>
							<Link to="/login">Back to login</Link>
						</div>
					</div>
				</form>
			</Widget>
		</div>
	);
};

export default RegisterPage;
