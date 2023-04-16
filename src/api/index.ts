import {
  getEvents,
  getEventsByPet,
  postEvent,
  patchEvent,
  deleteEvent,
  getEventCategories
} from './events';

import {
  getMeals,
  getMealsByPet,
  postMeal,
  patchMeal,
  deleteMeal,
  getFoodsByCategory,
} from './meals';

import {
  getPets,
  getPetById,
  postPet,
  patchPet,
  deletePet,
  getBreeds,
} from './pets';

import {
  getMedications,
  getMedicationsByPet,
  postMedication,
  patchMedication,
  deleteMedication,
  getMedicinesByCategory,
} from './medications';

import { getWidgets, postWidget, deleteWidget } from './widgets';

import { getProfile, patchProfile } from './auth';

export {
  getEvents,
  getEventsByPet,
  postEvent,
  patchEvent,
  deleteEvent,
  getEventCategories,
  getMeals,
  getMealsByPet,
  postMeal,
  patchMeal,
  deleteMeal,
  getFoodsByCategory,
  getPets,
  getPetById,
  postPet,
  patchPet,
  deletePet,
  getBreeds,
  getMedications,
  getMedicationsByPet,
  postMedication,
  patchMedication,
  deleteMedication,
  getMedicinesByCategory,
  getWidgets,
  postWidget,
  deleteWidget,
  getProfile,
  patchProfile,
};
