import { AttributeCreateDto, AttributeDto, AttributeUpdateDto, IAttributesRepo } from "@/domain";
import api from "../api/axiosInstance";

export class AttributesRepo implements IAttributesRepo {
    async getAll(): Promise<AttributeDto[]> {
        const res = await api.get<AttributeDto[]>("/attributes");
        return res.data;
    }
    async getByCategoryId(categoryId: string): Promise<AttributeDto[]> {
        const res = await api.get<AttributeDto[]>(`/attributes/category/${categoryId}`);
        return res.data;
    }
    async getById(id: string): Promise<AttributeDto> {
        const res = await api.get<AttributeDto>(`/attributes/${id}`);
        return res.data;
    }
    async create(req: AttributeCreateDto): Promise<AttributeDto> {
        const res = await api.post<AttributeDto>("/attributes", req);
        return res.data;
    }
    async update(id: string, req: AttributeUpdateDto): Promise<AttributeDto> {
        const res = await api.put<AttributeDto>(`/attributes/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/attributes/${id}`);
    }
}