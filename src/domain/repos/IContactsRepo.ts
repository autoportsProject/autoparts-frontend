import { ContactCreateDto, ContactDto, ContactUpdateDto } from "@/domain";

export interface IContactsRepo {
    getAll(): Promise<ContactDto[]>;
    getById(id: string): Promise<ContactDto>;
    create(req: ContactCreateDto): Promise<ContactDto>;
    update(id: string, req: ContactUpdateDto): Promise<ContactDto>;
    delete(id: string): Promise<void>;
}