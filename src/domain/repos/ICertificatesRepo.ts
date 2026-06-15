import { CertificateDto, CertificateCreateDto, CertificateUpdateDto } from "@/domain";

export interface ICertificatesRepo {
    getAll(): Promise<CertificateDto[]>;
    getById(id: string): Promise<CertificateDto>;
    create(req: CertificateCreateDto): Promise<CertificateDto>;
    update(id: string, req: CertificateUpdateDto): Promise<CertificateDto>;
    delete(id: string): Promise<void>;
}