import { CompanyDto, CompanyUpdateDto, ICompanyRepo } from "@/domain";
import api from "../api/axiosInstance";

export class CompanyRepo implements ICompanyRepo {
    async get(): Promise<CompanyDto> {
        const res = await api.get<CompanyDto>("/company");
        return res.data;
    }
    async update(req: CompanyUpdateDto): Promise<CompanyDto> {
        const res = await api.put<CompanyDto>("/company", req);
        return res.data;
    }
}