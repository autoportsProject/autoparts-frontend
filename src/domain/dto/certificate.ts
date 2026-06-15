export interface CertificateDto {
    id: string;
    name: string;
    imagePath?: string;
}

export interface CertificateCreateDto {
    name: string;
    imagePath?: string;
}

export interface CertificateUpdateDto {
    name: string;
    imagePath?: string;
}