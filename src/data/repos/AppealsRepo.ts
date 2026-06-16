import { AnyAppealDto, AppealContactsUpdateDto, AppealStatusUpdateDto, ClientQuestionCreateDto, ClientQuestionDto, CreateSupplierRequestDto, IAppealsRepo, SupplierRequestDto } from "@/domain";
import api from "../api/axiosInstance";

export class AppealsRepo implements IAppealsRepo {
    async getAll(): Promise<AnyAppealDto[]> {
        const res = await api.get<AnyAppealDto[]>("/appeals");
        return res.data;
    }
    async getById(id: string): Promise<AnyAppealDto> {
        const res = await api.get<AnyAppealDto>(`/appeals/${id}`);
        return res.data;
    }
    async getMy(): Promise<AnyAppealDto[]> {
        const res = await api.get<AnyAppealDto[]>("/appeals/my");
        return res.data;
    }
    async getByUserId(userId: string): Promise<AnyAppealDto[]> {
        const res = await api.get<AnyAppealDto[]>(`/appeals/user/${userId}`);
        return res.data;
    }
    async createQuestion(req: ClientQuestionCreateDto): Promise<ClientQuestionDto> {
        const res = await api.post<ClientQuestionDto>("/appeals/client-questions", req);
        return res.data;
    }
    async createSupplierRequest(req: CreateSupplierRequestDto): Promise<SupplierRequestDto> {
        const res = await api.post<SupplierRequestDto>("/appeals/supplier-requests", req);
        return res.data;
    }
    async updateStatus(id: string, req: AppealStatusUpdateDto): Promise<void> {
        await api.patch(`/appeals/${id}/status`, req);
    }
    async updateContacts(id: string, req: AppealContactsUpdateDto): Promise<void> {
        await api.patch(`/appeals/${id}/contacts`, req);
    }
}