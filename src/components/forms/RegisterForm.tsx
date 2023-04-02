import React from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationForm as APIRegistrationForm } from '../../api/auth/types';
import { SubmitButton } from '../buttons';
import { FormPasswordInput, FormTextInput } from '../input';

import styles from './RegisterForm.module.scss';

interface Props {
    handleSubmit: (formValues: APIRegistrationForm) => Promise<void>;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  verify: string
}

const RegisterForm: React.FC<Props> = ({ handleSubmit }) => {
  const { register, handleSubmit: handleFormSubmit, formState: { isSubmitting } } = useForm<RegisterForm>();
  
  const onSubmit = (formValues: RegisterForm) => {
    if (formValues.password !== formValues.verify) {
      return;
    }
    handleSubmit({
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
        <FormTextInput<RegisterForm>
          placeholder='Username'
          label='username'
          register={register}
          required
        />
        <FormTextInput<RegisterForm>
          placeholder='Email'
          label='email'
          register={register}
          required
        />
        <FormPasswordInput<RegisterForm>
          placeholder='Password'
          label='password'
          register={register}
          required
        />
        <FormPasswordInput<RegisterForm>
          placeholder='Verify Password'
          label='verify'
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