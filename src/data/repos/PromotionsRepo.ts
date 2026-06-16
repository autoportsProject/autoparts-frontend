import { IPromotionsRepo, PromotionCreateDto, PromotionDto, PromotionUpdateDto } from "@/domain";
import api from "../api/axiosInstance";

export class PromotionsRepo implements IPromotionsRepo {
    async getAll(): Promise<PromotionDto[]> {
        const res = await api.get<PromotionDto[]>("/promotions");
        return res.data;
    }
    async getById(id: string): Promise<PromotionDto> {
        const res = await api.get<PromotionDto>(`/promotions/${id}`);
        return res.data;
    }
    async create(req: PromotionCreateDto): Promise<PromotionDto> {
        const res = await api.post<PromotionDto>("/promotions", req);
        return res.data;
    }
    async update(id: string, req: PromotionUpdateDto): Promise<PromotionDto> {
        const res = await api.put<PromotionDto>(`/promotions/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/promotions/${id}`);
    }
}