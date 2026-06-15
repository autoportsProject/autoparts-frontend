import { ClientQuestionDto, ClientQuestionCreateDto, SupplierRequestDto, CreateSupplierRequestDto, AppealStatusUpdateDto, AppealContactsUpdateDto, AnyAppealDto } from "@/domain";

export interface IAppealsRepo {
    getAll(): Promise<AnyAppealDto[]>;
    getById(id: string): Promise<AnyAppealDto>;
    getMy(): Promise<AnyAppealDto[]>;
    getByUserId(userId: string): Promise<AnyAppealDto[]>;
    createQuestion(req: ClientQuestionCreateDto): Promise<ClientQuestionDto>;
    createSupplierRequest(req: CreateSupplierRequestDto): Promise<SupplierRequestDto>;
    updateStatus(id: string, req: AppealStatusUpdateDto): Promise<void>;
    updateContacts(id: string, req: AppealContactsUpdateDto): Promise<void>;
}