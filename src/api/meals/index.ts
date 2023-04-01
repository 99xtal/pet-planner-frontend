import { get, post, patch, destroy } from '../config';
import { Food, Meal, MealForm } from './types';

export function getMeals() {
  return get<Meal[]>('/meals/');
}

export function getMealsByPet(petId: number) {
  return get<Meal[]>(`/meals/?petId=${petId}`);
}

export function postMeal(newMeal: MealForm) {
  return post<Meal>('/meals/', newMeal);
}

export function patchMeal(mealId: number, updatedMeal: Partial<MealForm>) {
  return patch<Meal>(`/meals/${mealId}/`, updatedMeal);
}

export function deleteMeal(mealId: number) {
  return destroy(`/meals/${mealId}/`);
}

export function getFoodsByCategory(categoryId: number) {
  return get<Food[]>(`/meals/foods/?categoryId=${categoryId}`);
}
