import { AttributeDto } from "./attribute";

export interface CategoryDto {
    id: string;
    name: string;
    attributes?: AttributeDto[];
}

export interface CategoryCreateDto {
    name: string;
}

export interface CategoryUpdateDto {
    name: string;
}