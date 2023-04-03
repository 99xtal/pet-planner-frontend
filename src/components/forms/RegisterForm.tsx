import React from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationForm } from '../../api/auth/types';
import { SubmitButton } from '../buttons';

import styles from './RegisterForm.module.scss';

interface Props {
    handleSubmit: (formValues: RegistrationForm) => Promise<void>;
}

const validationSchema = {
  username: { 
    required: { value: true, message: 'Username is required' } 
  },
  email: {
    required: { value: true, message: 'Email is required' },
    pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: 'Invalid email'}
  },
  password: { 
    required: { value: true, message: 'Password is required' },
    minLength: { value: 8, message: 'Invalid Password: Too Short'}
  }
};

const RegisterForm: React.FC<Props> = ({ handleSubmit }) => {
  const { register, handleSubmit: handleFormSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationForm>();

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <div className={styles.register__form}>
        <div className={styles.form}>
          <div className={styles.input}>
            <label className={styles.input__label} htmlFor="username">Username:</label>
            <input
              id="username"
              aria-label='username'
              type="text"
              className={errors.username ? styles.input__box__error : styles.input__box}
              {...register('username', validationSchema.username)}
            />
          </div>
          <div className={styles.input}>
            <label className={styles.input__label} htmlFor="email">Email:</label>
            <input
              id="email"
              aria-label='email'
              type="text"
              className={errors.email ? styles.input__box__error : styles.input__box}
              {...register('email', validationSchema.email)}
            />
          </div>
          <div className={styles.input}>
            <label className={styles.input__label} htmlFor="password">Password:</label>
            <input
              id="password"
              aria-label='password'
              type='password'
              className={errors.password ? styles.input__box__error : styles.input__box}
              {...register('password', validationSchema.password)}
            />
          </div>
        </div>
        <div>
          {errors.username && <span>{errors.username.message}</span>}
          {errors.email && <span>{errors.email.message}</span>}
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <p className={styles.register__text}>
          NOTE: Make this an uncommon password with characters, numbers, and
          special characters!
        </p>
        <div className={styles.register__buttons}>
          <SubmitButton loading={isSubmitting} disabled={isSubmitting}>Sign Up</SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;