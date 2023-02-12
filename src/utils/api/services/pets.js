import { get, post, patch, destroy } from '../config';

export function getPets() {
  return get('/pets/');
}

export function getPetById(petId) {
  return get(`/pets/${petId}/`);
}

export function postPet(newPet) {
  return post('/pets/', newPet);
}

export function patchPet(petId, updatedPet) {
  return patch(`/pets/${petId}/`, updatedPet);
}

export function deletePet(petId) {
  return destroy(`/pets/${petId}/`);
}

export function getBreedsByCategory(categoryId) {
  return get(`/pets/breeds/?categoryId=${categoryId}`);
}

export function getPetCategories() {
  return get('/pets/categories/');
}
