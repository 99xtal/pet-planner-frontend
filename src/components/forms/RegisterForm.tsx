import React from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationForm as APIRegistrationForm } from '../../api/auth/types';
import { SubmitButton } from '../buttons';

import styles from './RegisterForm.module.scss';

interface Props {
    handleSubmit: (formValues: APIRegistrationForm) => Promise<void>;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string
}

const RegisterForm: React.FC<Props> = ({ handleSubmit }) => {
  const { register, handleSubmit: handleFormSubmit, formState: { isSubmitting } } = useForm<RegisterForm>();
  
  const onSubmit = async (formValues: RegisterForm) => {
    if (formValues.password !== formValues.confirmPassword) {
      return;
    }
    await handleSubmit({
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
      first_name: '',
      last_name: '',
    });
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <div className={styles.register__form}>
        <input
          aria-label='username'
          type="text"
          placeholder='Username'
          className={styles.register__input}
          {...register('username', { required: true })}
        />
        <input
          aria-label='email'
          type="text"
          placeholder='Email'
          className={styles.register__input}
          {...register('email', { required: true })}
        />
        <input
          aria-label='password'
          type='password'
          placeholder='Password'
          className={styles.register__input}
          {...register('password', { required: true })}
        />
        <input
          aria-label='confirm-password'
          type='password'
          placeholder='Confirm Password'
          className={styles.register__input}
          {...register('confirmPassword', { required: true })}
        />
        <p style={{ fontSize: '12px' }}>
          NOTE: Make this an uncommon password with characters, numbers, and
          special characters!
        </p>
        <div className={styles.register__buttons}>
          <SubmitButton disabled={isSubmitting}>Register!</SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;