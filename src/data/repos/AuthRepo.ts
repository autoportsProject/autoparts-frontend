import { IAuthRepo, LoginDto, RegisterDto, TokenResponse } from "@/domain";
import api from "../api/axiosInstance";

export class AuthRepo implements IAuthRepo {
    async register(req: RegisterDto): Promise<TokenResponse> {
        const res = await api.post<TokenResponse>("/auth/register", req);
        return res.data;
    }
    async login(req: LoginDto): Promise<TokenResponse> {
        const res = await api.post<TokenResponse>("/auth/login", req);
        return res.data;
    }
}