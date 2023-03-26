import { get, post, patch, destroy } from '../../config';
import { Medication, MedicationForm, Medicine } from './types';

export function getMedications() {
  return get<Medication[]>('/medications/');
}

export function getMedicationsByPet(petId: number) {
  return get<Medication[]>(`/medications/?petId=${petId}`);
}

export function postMedication(newMedication: MedicationForm) {
  return post<Medication>('/medications/', newMedication);
}

export function patchMedication(medicationId: number, updatedMedication: Partial<MedicationForm>) {
  return patch<Medication>(`/medications/${medicationId}/`, updatedMedication);
}

export function deleteMedication(medicationId: Number) {
  return destroy(`/medications/${medicationId}/`);
}

export function getMedicinesByCategory(categoryId: number) {
  return get<Medicine[]>(`/medications/medicines/?categoryId=${categoryId}`);
}
