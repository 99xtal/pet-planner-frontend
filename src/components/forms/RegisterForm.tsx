import React from 'react';
import { RegistrationForm } from '../../api/auth/types';
import useCustomForm from '../../hooks/useCustomForm';
import { SubmitButton } from '../buttons';
import { PasswordInput, TextInput } from '../input';

import styles from './RegisterForm.module.scss';

interface Props {
    handleSubmit: (formValues: RegistrationForm) => Promise<void>;
}

const RegisterForm: React.FC<Props> = ({ handleSubmit: onSubmit }) => {
  const defaultValues = {
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  };
  const { formData, handleInputChange, handleSubmit } = useCustomForm(
    defaultValues,
    onSubmit
  );
      
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.register__form}>
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
        <div className={styles.register__buttons}>
          <SubmitButton>Register!</SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;