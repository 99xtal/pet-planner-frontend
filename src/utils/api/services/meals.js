import { get, post, patch, destroy } from "../config";

export function getMeals() {
  return get("/meals/");
}

export function getMealsByPet(petId) {
  return get(`/meals/?petId=${petId}`);
}

export function postMeal(newMeal) {
  return post("/meals/", newMeal);
}

export function patchMeal(mealId, updatedMeal) {
  return patch(`/meals/${mealId}/`, updatedMeal);
}

export function deleteMeal(mealId) {
  return destroy(`/meals/${mealId}/`);
}

export function getFoodsByCategory(categoryId) {
  return get(`/meals/foods/?categoryId=${categoryId}`);
}
