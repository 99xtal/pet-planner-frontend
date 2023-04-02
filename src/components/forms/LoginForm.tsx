import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthContext from '../../context/AuthContext';
import { SubmitButton } from '../buttons';
import type { LoginForm } from '../../api/auth/types';

import styles from './LoginForm.module.scss';
import { listMissingFields } from '../../utils/forms';

const LoginForm: React.FC = () => {
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();  

  const onSubmit = async (formData: LoginForm) => {
    try {
      await loginUser(formData);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        aria-label='username'
        type="text"
        placeholder='Username'
        className={styles.form__input}
        {...register('username', { required: true })}
      />
      <input
        aria-label='password'
        type='password'
        placeholder='Password'
        className={styles.form__input}
        {...register('password', { required: true })}
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