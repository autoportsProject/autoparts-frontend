import { IUsersRepo, PasswordUpdateDto, ProfileDto, ProfileUpdateDto, UserCreateDto, UserRoleUpdateDto, UserUpdateDto } from "@/domain";
import api from "../api/axiosInstance";

export class UsersRepo implements IUsersRepo {
    async getMe(): Promise<ProfileDto> {
        const res = await api.get<ProfileDto>("/users/me");
        return res.data;
    }
    async updateProfile(req: ProfileUpdateDto): Promise<ProfileDto> {
        const res = await api.put<ProfileDto>("/users/me/profile", req);
        return res.data;
    }
    async changePassword(req: PasswordUpdateDto): Promise<void> {
        await api.put<ProfileDto>("/users/me/password", req);
    }
    async getAll(): Promise<ProfileDto[]> {
        const res = await api.get<ProfileDto[]>("/users");
        return res.data;
    }
    async getById(id: string): Promise<ProfileDto> {
        const res = await api.get<ProfileDto>(`/users/${id}`);
        return res.data;
    }
    async create(req: UserCreateDto): Promise<ProfileDto> {
        const res = await api.post<ProfileDto>("/users", req);
        return res.data;
    }
    async update(id: string, req: UserUpdateDto): Promise<ProfileDto> {
        const res = await api.put<ProfileDto>(`/users/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/users/${id}`);
    }
    async updateRole(id: string, req: UserRoleUpdateDto): Promise<void> {
        await api.patch(`/users/${id}/role`, req);
    }
}