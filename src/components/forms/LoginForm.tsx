import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthContext from '../../context/AuthContext';
import { SubmitButton } from '../buttons';
import { FormPasswordInput, FormTextInput } from '../input';
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
      <FormTextInput<LoginForm>
        placeholder={'Username'}
        label={'username'}
        register={register}
        required
      />
      <FormPasswordInput<LoginForm>
        placeholder={'Password'}
        label={'password'}
        register={register}
        required
      />
      {!error && !!Object.keys(errors).length && <p className={styles.error}>{`Invalid ${listMissingFields(errors).join(' and ')}.`}</p>}
      {error && <p className={styles.error}>Login failed. Incorrect username or password.</p>}
      <div className={styles.form__buttonContainer}>
        <SubmitButton disabled={isSubmitting}>Log In</SubmitButton>
      </div>
    </form>
  );
};

export default LoginForm;