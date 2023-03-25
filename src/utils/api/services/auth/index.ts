import { get, patch } from '../../config';
import type { User } from './types';

export function getProfile() {
  return get<User>('/auth/users/');
}

export function patchProfile(updatedProfile: Partial<User>) {
  return patch<User>('/auth/users/', updatedProfile);
}
