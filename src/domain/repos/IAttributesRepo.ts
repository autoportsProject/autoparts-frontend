import { AttributeCreateDto, AttributeDto, AttributeUpdateDto } from "@/domain";

export interface IAttributesRepo {
    getByCategoryId(categoryId: string): Promise<AttributeDto[]>;
    getById(id: string): Promise<AttributeDto>;
    create(req: AttributeCreateDto): Promise<AttributeDto>;
    update(id: string, req: AttributeUpdateDto): Promise<AttributeDto>;
    delete(id: string): Promise<void>;
}