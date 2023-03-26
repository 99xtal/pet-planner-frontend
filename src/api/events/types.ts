import type { User } from '../auth/types'
import type { Pet } from '../pets/types'

export interface EventCategory {
    id: number;
    title: string;
}

export interface Event {
    id: number;
    event_category: EventCategory;
    date: string;
    time: string | null;
    description: string | null;
    user: User;
    pet: Pet;
}

export interface EventForm {
    event_category_id: number;
    date: string;
    time: string | null;
    description: string | null;
    user_id: number;
    pet_id: number;
}