import { CategoryCreateDto, CategoryDto, CategoryUpdateDto, ICategoriesRepo } from "@/domain";
import api from "../api/axiosInstance";

export class CategoriesRepo implements ICategoriesRepo {
    async getAll(): Promise<CategoryDto[]> {
        const res = await api.get<CategoryDto[]>("/categories");
        return res.data;
    }
    async getById(id: string): Promise<CategoryDto> {
        const res = await api.get<CategoryDto>(`/categories/${id}`);
        return res.data;
    }
    async create(req: CategoryCreateDto): Promise<CategoryDto> {
        const res = await api.post<CategoryDto>("/categories", req);
        return res.data;
    }
    async update(id: string, req: CategoryUpdateDto): Promise<CategoryDto> {
        const res = await api.put<CategoryDto>(`/categories/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/categories/${id}`);
    }   
}