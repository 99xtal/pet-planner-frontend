enum Gender {
    MALE = "M",
    FEMALE = "F",
    UNKNOWN = "U",
}

export interface PetCategory {
    id: number;
    category: string;
}

interface Species {
    id: number;
    binomial_name: string;
}

interface Breed {
    id: number;
    name: string;
    category: PetCategory;
    species: Species;
}

export interface Pet {
    id: number;
    name: string;
    birthday: string;
    gender: Gender;
    weight: number;
    category: PetCategory;
    breed: Breed;
}