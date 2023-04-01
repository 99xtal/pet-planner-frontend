import { User } from '../auth/types';
import { Pet } from '../pets/types';

export enum WidgetOptions {
    TIMELINE = 'timeline',
    BIO = 'bio',
    DIET = 'diet',
    HEALTH = 'health'
}

export interface Widget {
    id: number;
    type: WidgetOptions;
    user: User;
    pet?: Pet;
}

export interface WidgetForm {
    type: WidgetOptions;
    user_id: number;
    pet_id?: number;
}