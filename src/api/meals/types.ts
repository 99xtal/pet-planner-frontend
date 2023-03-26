import type { Pet, PetCategory } from '../pets/types'

export enum FoodAmountUnits {
    GRAMS = 'g',
    KILOGRAMS = 'kg',
    CUPS = 'cups',
    WHOLE = 'whole'
}

export interface Food {
    id: number;
    name: string;
    pet_category: PetCategory;
}

export interface Meal {
    id: number;
    food: Food;
    amount: number;
    amount_units: FoodAmountUnits;
    time: string;
    pet: Pet
}

export interface MealForm {
    food_id: number;
    amount: number;
    amount_units: FoodAmountUnits;
    time: string;
    pet_id: number;
}