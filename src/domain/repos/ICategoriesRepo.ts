import { CategoryCreateDto, CategoryDto, CategoryUpdateDto } from "@/domain";

export interface ICategoriesRepo {
    getAll(): Promise<CategoryDto[]>;
    getById(id: string): Promise<CategoryDto>;
    create(req: CategoryCreateDto): Promise<CategoryDto>;
    update(id: string, req: CategoryUpdateDto): Promise<CategoryDto>;
    delete(id: string): Promise<void>;
}