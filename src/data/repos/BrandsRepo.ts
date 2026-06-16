import { BrandCreateDto, BrandDto, BrandUpdateDto, IBrandsRepo } from "@/domain";
import api from "../api/axiosInstance";

export class BrandsRepo implements IBrandsRepo {
    async getAll(): Promise<BrandDto[]> {
        const res = await api.get<BrandDto[]>("/brands");
        return res.data;
    }
    async getById(id: string): Promise<BrandDto> {
        const res = await api.get<BrandDto>(`/brands/${id}`);
        return res.data;
    }
    async create(req: BrandCreateDto): Promise<BrandDto> {
        const res = await api.post<BrandDto>("/brands", req);
        return res.data;
    }
    async update(id: string, req: BrandUpdateDto): Promise<BrandDto> {
        const res = await api.put<BrandDto>(`/brands/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/brands/${id}`);
    }
}