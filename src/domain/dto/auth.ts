import { UserRole } from "../enums/user";

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
}

export interface TokenResponse {
    token: string;
    userId: string;
    name: string;
    email: string;
    role: UserRole;
}