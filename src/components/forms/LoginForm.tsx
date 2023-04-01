import { useContext, useEffect } from "react";

import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { SubmitButton } from "../buttons";
import { PasswordInput, TextInput } from "../input";

import styles from './LoginForm.module.scss'

const LoginForm: React.FC = () => {
    const { loginUser, isServerError } = useContext(AuthContext);
    const defaultValues = { username: '', password: '' };
    const { formData, handleInputChange, handleSubmit, reset } = useCustomForm(
      defaultValues,
      loginUser
    );
  
    useEffect(() => {
      if (isServerError) {
        reset();
      }
    }, [isServerError]);
    
    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.form}>
                <TextInput
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <PasswordInput
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                {isServerError ? (
                    <p className="error">Login failed, incorrect credentials!</p>
                ) : null}
                <div className={styles.form__buttonContainer}>
                    <SubmitButton>Log In</SubmitButton>
                </div>
            </div>
      </form>
    )
}

export default LoginForm;