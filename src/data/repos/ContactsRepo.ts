import { ContactCreateDto, ContactDto, ContactUpdateDto, IContactsRepo } from "@/domain";
import api from "../api/axiosInstance";

export class ContactsRepo implements IContactsRepo {
    async getAll(): Promise<ContactDto[]> {
        const res = await api.get<ContactDto[]>("/company/contacts");
        return res.data;
    }
    async getById(id: string): Promise<ContactDto> {
        const res = await api.get<ContactDto>(`/company/contacts/${id}`);
        return res.data;
    }
    async create(req: ContactCreateDto): Promise<ContactDto> {
        const res = await api.post<ContactDto>("/company/contacts", req);
        return res.data;
    }
    async update(id: string, req: ContactUpdateDto): Promise<ContactDto> {
        const res = await api.put<ContactDto>(`/company/contacts/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/company/contacts/${id}`);
    }
}