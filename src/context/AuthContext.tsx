import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { loginUser, registerUser } from '../api/auth';
import { LoginForm, RegistrationForm, TokenData, UserBasic } from '../api/auth/types';

export interface AuthContextValue {
  user: UserBasic | null,
  token: string | null,
  loginUser: (loginForm: LoginForm) => Promise<void>,
  logoutUser: () => void,
  registerUser: (registerForm: RegistrationForm) => Promise<void>,
  isServerError: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  loginUser: () => new Promise(() => null),
  logoutUser: () => null,
  registerUser: () => new Promise(() => null),
  isServerError: false,
});

export default AuthContext;

function setUserObject(user: TokenData | null) {
  if (!user) {
    return null;
  }
  return {
    username: user.username,
    id: user.user_id,
    first_name: user.first_name,
  } as UserBasic;
}

export const AuthProvider = ({ children }) => {
  // @ts-ignore
  const userToken = JSON.parse(localStorage.getItem('token')) || null;
  const decodedUser: TokenData | null = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const register = async (registerData: RegistrationForm) => {
    try {
      const finalData = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        first_name: registerData.first_name,
        last_name: registerData.last_name,
      };
      const response = await registerUser(finalData);
      if (response.status === 201) {
        console.log('Successful registration! Log in to access token');
        setIsServerError(false);
        navigate('/login');
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (loginData: LoginForm) => {
    try {
      const response = await loginUser(loginData);
      if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data.access));
        setToken(response.data.access);
        const loggedInUser = jwtDecode<TokenData>(response.data.access);
        setUser(setUserObject(loggedInUser));
        setIsServerError(false);
        navigate('/dashboard');
      } else {
        navigate('/register');
      }
    } catch (error) {
      console.log(error);
      setIsServerError(true);
      navigate('/register');
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      navigate('/');
    }
  };

  const contextData = {
    user,
    token,
    loginUser: login,
    logoutUser,
    registerUser: register,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
