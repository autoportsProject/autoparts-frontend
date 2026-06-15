export interface PromotionDto {
    id: string;
    name: string;
    description?: string;
    publishedAt: string;
    imagePath?: string;
}

export interface PromotionCreateDto {
    name: string;
    description?: string;
    publishedAt?: string;
    imagePath?: string;
}

export interface PromotionUpdateDto {
    name: string;
    description?: string;
    publishedAt?: string;
    imagePath?: string;
}