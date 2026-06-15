import { PromotionCreateDto, PromotionDto, PromotionUpdateDto } from "@/domain";

export interface IPromotionsRepo {
    getAll(): Promise<PromotionDto[]>;
    getById(id: string): Promise<PromotionDto>;
    create(req: PromotionCreateDto): Promise<PromotionDto>;
    update(id: string, req: PromotionUpdateDto): Promise<PromotionDto>;
    delete(id: string): Promise<void>;
}