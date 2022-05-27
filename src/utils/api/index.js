import {
  getEvents,
  getEventsByPet,
  postEvent,
  patchEvent,
  deleteEvent,
} from "./services/events";

import {
  getMeals,
  getMealsByPet,
  postMeal,
  patchMeal,
  deleteMeal,
  getFoodsByCategory,
} from "./services/meals";

import { getPets, getPetById } from "./services/pets";

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
};
