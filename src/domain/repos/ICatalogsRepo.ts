import { SupplierSectionCreateDto, SupplierSectionDto } from "@/domain";

export interface ICatalogsRepo {
    getAll(): Promise<SupplierSectionDto[]>;
    create(req: SupplierSectionCreateDto): Promise<SupplierSectionDto>;
}