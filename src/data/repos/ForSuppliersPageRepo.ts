import { ForSuppliersPageDto, ForSuppliersPageUpdateDto } from "@/domain/dto/forSuppliers";
import { IForSuppliersPageRepo } from "@/domain/repos/IForSuppliersPageRepo";
import api from "../api/axiosInstance";

export class ForSuppliersPageRepo implements IForSuppliersPageRepo {
    async get(): Promise<ForSuppliersPageDto> {
        const res = await api.get<ForSuppliersPageDto>("/for-suppliers");
        return res.data;
    }
    async update(req: ForSuppliersPageUpdateDto): Promise<ForSuppliersPageDto> {
        const res = await api.put<ForSuppliersPageDto>("/for-suppliers", req);
        return res.data;
    }
}