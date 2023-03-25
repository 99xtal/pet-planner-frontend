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