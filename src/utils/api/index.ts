import {
  getEvents,
  getEventsByPet,
  postEvent,
  patchEvent,
  deleteEvent,
} from './services/events';

import {
  getMeals,
  getMealsByPet,
  postMeal,
  patchMeal,
  deleteMeal,
  getFoodsByCategory,
} from './services/meals';

import {
  getPets,
  getPetById,
  postPet,
  patchPet,
  deletePet,
  getBreedsByCategory,
  getPetCategories,
} from './services/pets';

import {
  getMedications,
  getMedicationsByPet,
  postMedication,
  patchMedication,
  deleteMedication,
  getMedicinesByCategory,
} from './services/medications';

import { getWidgets, postWidget, deleteWidget } from './services/widgets';

import { getProfile, patchProfile } from './services/auth';

export {
  getEvents,
  getEventsByPet,
  postEvent,
  patchEvent,
  deleteEvent,
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
  getBreedsByCategory,
  getPetCategories,
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
