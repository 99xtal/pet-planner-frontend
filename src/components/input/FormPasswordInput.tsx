import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import styles from './PasswordInput.module.scss';

interface Props<T extends FieldValues> extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: Path<T>
    register: UseFormRegister<T>;
    required: boolean;
}

function FormPasswordInput<T extends FieldValues>({label, register, required, ...rest}: Props<T>) {
  return (
    <input
      type="password"
      className={styles.input}
      {...register(label, { required })}
      {...rest}
    />
  );
}

export default FormPasswordInput;