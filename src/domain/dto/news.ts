export interface NewsDto {
    id: string;
    name: string;
    description?: string;
    publishedAt: string;
    imagePath?: string;
}

export interface NewsCreateDto {
    name: string;
    description?: string;
    publishedAt?: string;
    imagePath?: string;
}

export interface NewsUpdateDto {
    name: string;
    description?: string;
    publishedAt?: string;
    imagePath?: string;
}