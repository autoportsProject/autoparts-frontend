import { PasswordUpdateDto, ProfileDto, ProfileUpdateDto, UserCreateDto, UserRoleUpdateDto, UserUpdateDto } from "@/domain";

export interface IUsersRepo {
    getMe(): Promise<ProfileDto>;
    updateProfile(req: ProfileUpdateDto): Promise<ProfileDto>;
    changePassword(req: PasswordUpdateDto): Promise<void>;

    getAll(): Promise<ProfileDto[]>;
    getById(id: string): Promise<ProfileDto>;
    create(req: UserCreateDto): Promise<ProfileDto>;
    update(id: string, req: UserUpdateDto): Promise<ProfileDto>;
    delete(id: string): Promise<void>;
    
    updateRole(id: string, req: UserRoleUpdateDto): Promise<void>;
}