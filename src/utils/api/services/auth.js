import { get, patch } from '../config';

export function getProfile() {
  return get('/auth/users/');
}

export function patchProfile(updatedProfile) {
  return patch('/auth/users/', updatedProfile);
}
