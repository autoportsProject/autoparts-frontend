import { ContactDto } from "./contact";

export interface CompanyDto {
    name: string;
    description?: string;
    address?: string;
    contacts: ContactDto[];
}

export interface CompanyUpdateDto {
    name: string;
    description?: string;
    address?: string;
}