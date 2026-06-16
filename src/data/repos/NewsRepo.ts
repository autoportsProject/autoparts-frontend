import { INewsRepo, NewsCreateDto, NewsDto, NewsUpdateDto } from "@/domain";
import api from "../api/axiosInstance";

export class NewsRepo implements INewsRepo {
    async getAll(): Promise<NewsDto[]> {
        const res = await api.get<NewsDto[]>("/news");
        return res.data;
    }
    async getById(id: string): Promise<NewsDto> {
        const res = await api.get<NewsDto>(`/news/${id}`);
        return res.data;
    }
    async create(req: NewsCreateDto): Promise<NewsDto> {
        const res = await api.post<NewsDto>("/news", req);
        return res.data;
    }
    async update(id: string, req: NewsUpdateDto): Promise<NewsDto> {
        const res = await api.put<NewsDto>(`/news/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/news/${id}`);
    }
}