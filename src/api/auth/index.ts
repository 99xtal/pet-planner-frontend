import { get, post, patch } from '../config';
import { LoginForm, RegistrationForm, TokenPair, User } from './types';

export function getProfile() {
  return get<User>('/auth/users/');
}

export function patchProfile(updatedProfile: Partial<User>) {
  return patch<User>('/auth/users/', updatedProfile);
}

export function registerUser(registerForm: RegistrationForm) {
  return post<User>('/auth/register/', registerForm);
}

export function loginUser(loginForm: LoginForm) {
  return post<TokenPair>('/auth/login/', loginForm);
}