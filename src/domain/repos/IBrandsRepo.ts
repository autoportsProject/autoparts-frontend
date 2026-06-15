import { BrandCreateDto, BrandDto, BrandUpdateDto } from "@/domain";

export interface IBrandsRepo {
    getAll(): Promise<BrandDto[]>;
    getById(id: string): Promise<BrandDto>;
    create(req: BrandCreateDto): Promise<BrandDto>;
    update(id: string, req: BrandUpdateDto): Promise<BrandDto>;
    delete(id: string): Promise<void>;
}