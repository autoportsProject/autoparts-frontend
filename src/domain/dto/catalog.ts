export interface SupplierSectionDto {
    id: string;
    name: string;
    description?: string;
}

export interface SupplierSectionCreateDto {
    name: string;
    description?: string;
}

export interface SupplierSectionUpdateDto {
    name: string;
    description?: string;
}