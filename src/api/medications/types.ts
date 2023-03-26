import type { Pet, PetCategory } from "../pets/types";

export enum MedicationAmountUnits {
    PILLS = "pills",
    CCS = "ccs",
    DROPS = "drops"
}

export interface Medicine {
    id: number;
    name: string;
    pet_category: PetCategory
}

export interface Medication {
    id: number;
    medicine: Medicine;
    amount: number;
    amount_units: MedicationAmountUnits;
    time: string;
    pet: Pet;
}

export interface MedicationForm {
    medicine_id: number;
    amount: number;
    amount_units: MedicationAmountUnits;
    time: string;
    pet_id: number;
}