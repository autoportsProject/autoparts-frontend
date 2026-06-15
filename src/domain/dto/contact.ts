export interface ContactDto {
    id: string;
    name: string;
    description?: string;
}

export interface ContactCreateDto {
    name: string;
    description?: string;
}

export interface ContactUpdateDto {
    name: string;
    description?: string;
}