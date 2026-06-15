import { LoginDto, RegisterDto, TokenResponse } from "@/domain";

export interface IAuthRepo {
    register(req: RegisterDto): Promise<TokenResponse>;
    login(req: LoginDto): Promise<TokenResponse>;
}