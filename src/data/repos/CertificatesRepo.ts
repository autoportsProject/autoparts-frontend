import { CertificateCreateDto, CertificateDto, CertificateUpdateDto, ICertificatesRepo } from "@/domain";
import api from "../api/axiosInstance";

export class CertificatesRepo implements ICertificatesRepo {
    async getAll(): Promise<CertificateDto[]> {
        const res = await api.get<CertificateDto[]>("/certificates");
        return res.data;
    }
    async getById(id: string): Promise<CertificateDto> {
        const res = await api.get<CertificateDto>(`/certificates/${id}`);
        return res.data;
    }
    async create(req: CertificateCreateDto): Promise<CertificateDto> {
        const res = await api.post<CertificateDto>("/certificates", req);
        return res.data;
    }
    async update(id: string, req: CertificateUpdateDto): Promise<CertificateDto> {
        const res = await api.put<CertificateDto>(`/certificates/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/certificates/${id}`);
    }
}