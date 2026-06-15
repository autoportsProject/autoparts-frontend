import { ClientQuestionDto, ClientQuestionCreateDto, SupplierRequestDto, CreateSupplierRequestDto, AppealStatusUpdateDto, AppealContactsUpdateDto, PagedList } from "@/domain";

export interface IAppealsRepo {
    getMyAppeals(): Promise<ClientQuestionDto[] | SupplierRequestDto[]>;
    getQuestions(page: number, pageSize: number): Promise<PagedList<ClientQuestionDto>>;
    getQuestionById(id: string): Promise<ClientQuestionDto>;
    createQuestion(req: ClientQuestionCreateDto): Promise<ClientQuestionDto>;
    updateQuestionStatus(id: string, req: AppealStatusUpdateDto): Promise<void>;
    updateQuestionContacts(id: string, req: AppealContactsUpdateDto): Promise<void>;

    getSupplierRequests(page: number, pageSize: number): Promise<PagedList<SupplierRequestDto>>;
    getSupplierRequestById(id: string): Promise<SupplierRequestDto>;
    createSupplierRequest(req: CreateSupplierRequestDto): Promise<SupplierRequestDto>;
    updateSupplierRequestStatus(id: string, req: AppealStatusUpdateDto): Promise<void>;
    updateSupplierRequestContacts(id: string, req: AppealContactsUpdateDto): Promise<void>;
}