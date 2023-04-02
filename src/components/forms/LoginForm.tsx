import React, { useContext } from 'react';
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
  const { loginUser, isServerError } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();  

  return (
    <form onSubmit={handleSubmit(loginUser)}>
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
        {!!Object.keys(errors).length && <p>{`Invalid ${listMissingFields(errors).join(' and ')}`}</p>}
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <div className={styles.form__buttonContainer}>
          <SubmitButton>Log In</SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;