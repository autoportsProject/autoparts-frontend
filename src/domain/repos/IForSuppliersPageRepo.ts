import { ForSuppliersPageDto, ForSuppliersPageUpdateDto } from "../dto/forSuppliers";

export interface IForSuppliersPageRepo {
    get(): Promise<ForSuppliersPageDto>;
    update(req: ForSuppliersPageUpdateDto): Promise<ForSuppliersPageDto>;
}