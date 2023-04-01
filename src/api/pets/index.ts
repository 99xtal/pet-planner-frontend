import { get, post, patch, destroy } from '../config';

import type { Breed, Pet, PetCategory, PetForm } from './types';

export function getPets() {
	return get<Pet[]>('/pets/');
}

export function getPetById(petId: number) {
	return get<Pet>(`/pets/${petId}/`);
}

export function postPet(newPet: PetForm) {
	return post<Pet>('/pets/', newPet);
}

export function patchPet(petId: number, updatedPet: Partial<Pet>) {
	return patch<Pet>(`/pets/${petId}/`, updatedPet);
}

export function deletePet(petId: number) {
	return destroy(`/pets/${petId}/`);
}

export function getBreedsByCategory(categoryId: number) {
	return get<Breed[]>(`/pets/breeds/?categoryId=${categoryId}`);
}

export function getPetCategories() {
	return get<PetCategory[]>('/pets/categories/');
}
