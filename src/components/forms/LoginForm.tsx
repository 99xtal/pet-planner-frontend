import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import AuthContext from '../../context/AuthContext';
import { SubmitButton } from '../buttons';
import { FormPasswordInput, FormTextInput,  } from '../input';
import type { LoginForm } from '../../api/auth/types';

import styles from './LoginForm.module.scss';

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
        {errors.username?.type === 'required' && <p>Invalid Username</p>}
        <FormPasswordInput<LoginForm>
          placeholder={'Password'}
          label={'password'}
          register={register}
          required
        />
        {errors.password?.type === 'required' && <p>Invalid Password</p>}
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