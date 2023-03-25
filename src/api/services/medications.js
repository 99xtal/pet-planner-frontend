import { get, post, patch, destroy } from '../config';

export function getMedications() {
  return get('/medications/');
}

export function getMedicationsByPet(petId) {
  return get(`/medications/?petId=${petId}`);
}

export function postMedication(newMedication) {
  return post('/medications/', newMedication);
}

export function patchMedication(medicationId, updatedMedication) {
  return patch(`/medications/${medicationId}/`, updatedMedication);
}

export function deleteMedication(medicationId) {
  return destroy(`/medications/${medicationId}/`);
}

export function getMedicinesByCategory(categoryId) {
  return get(`/medications/medicines/?categoryId=${categoryId}`);
}
