import React from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationForm } from '../../api/auth/types';
import { SubmitButton } from '../buttons';
import { FormPasswordInput, FormTextInput } from '../input';

import styles from './RegisterForm.module.scss';

interface Props {
    handleSubmit: (formValues: RegistrationForm) => Promise<void>;
}

const RegisterForm: React.FC<Props> = ({ handleSubmit: onSubmit }) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<RegistrationForm>();
      
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.register__form}>
        <FormTextInput<RegistrationForm>
          placeholder='Username'
          label='username'
          register={register}
          required
        />
        <FormTextInput<RegistrationForm>
          placeholder='Email'
          label='email'
          register={register}
          required
        />
        <FormPasswordInput<RegistrationForm>
          placeholder='Password'
          label='password'
          register={register}
          required
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