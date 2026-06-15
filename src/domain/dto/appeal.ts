import { AppealStatus, AppealType } from "../enums/appeal";

export interface ClientQuestionDto {
    id: string;
    number: string;
    createdAt: string;
    userId: string;
    contactPhone: string;
    contactEmail: string;
    managerComment: string;
    status: AppealStatus;
    category: AppealType;
}

export interface ClientQuestionCreateDto {
    category: AppealType;
    managerComment: string;
    contactPhone?: string | null;
    contactEmail?: string | null;
}

export interface SupplierRequestDto {
    id: string;
    number: string;
    createdAt: string;
    userId: string;
    contactPhone: string;
    contactEmail: string;
    managerComment: string;
    status: AppealStatus;
    companyName: string;
}

export interface CreateSupplierRequestDto {
    companyName: string;
    managerComment: string;
    contactPhone?: string | null;
    contactEmail?: string | null;
}

export interface AppealStatusUpdateDto {
    status: AppealStatus;
}

export interface AppealContactsUpdateDto {
    contactPhone: string;
    contactEmail: string;
}