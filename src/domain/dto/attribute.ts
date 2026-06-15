import { AttributeType } from "../enums/product";

export interface AttributeDto {
    id: string;
    name: string;
    type: AttributeType;
    unit?: string;
    categoryId: string;
}

export interface AttributeCreateDto {
    name: string;
    type: AttributeType;
    unit?: string;
    categoryId: string;
}

export interface AttributeUpdateDto {
    name: string;
    type: AttributeType;
    unit?: string;
}