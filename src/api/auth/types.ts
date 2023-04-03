export interface User {
    id: number;
    password: string;
    is_superuser: boolean;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: Date;
    groups: unknown[];
    user_permissions: unknown[];
}

export interface UserBasic {
    username: string;
    id: number;
    first_name: string;
}

export interface RegistrationForm {
    username: string;
    password: string;
    email: string;
    first_name?: string;
    last_name?: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface TokenPair {
    access: string;
    refresh: string;
}

export interface TokenData {
    username: string;
    user_id: number;
    first_name: string;
}