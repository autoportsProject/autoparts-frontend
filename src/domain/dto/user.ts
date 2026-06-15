import { UserRole } from "@/domain/enums/user";

export interface ProfileDto {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: UserRole;
    createdAt: string;
}

export interface UserCreateDto {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: UserRole;
}

export interface UserUpdateDto {
    name: string;
    phoneNumber?: string;
}

export interface ProfileUpdateDto {
    name: string;
    email: string;
    phoneNumber?: string;
}

export interface PasswordUpdateDto {
    currentPassword: string;
    newPassword: string;
}

export interface UserRoleUpdateDto {
    role: UserRole;
}