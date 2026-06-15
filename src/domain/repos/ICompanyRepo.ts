import { CompanyDto, CompanyUpdateDto } from "@/domain";

export interface ICompanyRepo {
    get(): Promise<CompanyDto>;
    update(req: CompanyUpdateDto): Promise<CompanyDto>;
}