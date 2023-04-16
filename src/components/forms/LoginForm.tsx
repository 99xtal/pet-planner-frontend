import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import AuthContext from '../../context/AuthContext';
import { SubmitButton } from '../buttons';
import type { LoginForm } from '../../api/auth/types';

import styles from './LoginForm.module.scss';
import { listMissingFields } from '../../utils/forms';
import { PasswordInput, TextInput } from '../input';

const LoginForm: React.FC = () => {
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();  

  const onSubmit = async (formData: LoginForm) => {
    try {
      setError(false);
      await loginUser(formData);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        rules={{ required: true}}
        render={({ field }) => <TextInput placeholder='Username' aria-label='username' {...field}/>}
      />
      <Controller 
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <PasswordInput placeholder='Password' aria-label='password' {...field}/>}
      />
      {!error && !!Object.keys(errors).length && <p className={styles.error}>{`Invalid ${listMissingFields(errors).join(' and ')}.`}</p>}
      {error && <p className={styles.error}>Login failed. Incorrect username or password.</p>}
      <div className={styles.form__buttonContainer}>
        <SubmitButton loading={isSubmitting} disabled={isSubmitting}>Log In</SubmitButton>
      </div>
    </form>
  );
};

export default LoginForm;