import {
	getEvents,
	getEventsByPet,
	postEvent,
	patchEvent,
	deleteEvent,
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
	getBreedsByCategory,
	getPetCategories,
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
