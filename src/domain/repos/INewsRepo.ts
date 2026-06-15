import { NewsCreateDto, NewsDto, NewsUpdateDto } from "@/domain";

export interface INewsRepo {
    getAll(): Promise<NewsDto[]>;
    getById(id: string): Promise<NewsDto>;
    create(req: NewsCreateDto): Promise<NewsDto>;
    update(id: string, req: NewsUpdateDto): Promise<NewsDto>;
    delete(id: string): Promise<void>;
}