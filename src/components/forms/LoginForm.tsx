import React, { useContext, useState } from 'react';
import { useForm, FieldErrors} from 'react-hook-form';

import AuthContext from '../../context/AuthContext';
import { SubmitButton } from '../buttons';
import { FormPasswordInput, FormTextInput } from '../input';
import type { LoginForm } from '../../api/auth/types';

import styles from './LoginForm.module.scss';

const listMissingFields = (errors: FieldErrors<LoginForm>) => {
  const entries = Object.entries(errors);
  return entries.filter(([_, error]) => error?.type === 'required').map(([field]) => field);
};

const LoginForm: React.FC = () => {
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted } } = useForm<LoginForm>();  

  const onSubmit = async (formData: LoginForm) => {
    try {
      await loginUser(formData);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
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
        {!!Object.keys(errors).length && <p>{`Invalid ${listMissingFields(errors).join(' and ')}.`}</p>}
        {error && <p className="error">Login failed. Invalid username or password.</p>}
        <div className={styles.form__buttonContainer}>
          <SubmitButton disabled={isSubmitting}>Log In</SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;