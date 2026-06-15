import { PagedList, PasswordUpdateDto, ProfileDto, ProfileUpdateDto, UserCreateDto, UserRoleUpdateDto } from "@/domain";

export interface IUsersRepo {
    getMe(): Promise<ProfileDto>;
    updateProfile(req: ProfileUpdateDto): Promise<ProfileDto>;
    changePassword(req: PasswordUpdateDto): Promise<void>;

    getAll(page: number, pageSize: number): Promise<PagedList<ProfileDto>>;
    getById(id: string): Promise<ProfileDto>;
    create(req: UserCreateDto): Promise<ProfileDto>;
    delete(id: string): Promise<void>;
    
    updateRole(id: string, req: UserRoleUpdateDto): Promise<void>;
}