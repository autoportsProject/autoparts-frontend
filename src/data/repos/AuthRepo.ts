import { IAuthRepo, LoginDto, RegisterDto, TokenResponse } from "@/domain";

export class AuthRepo implements IAuthRepo {
    async register(req: RegisterDto): Promise<TokenResponse> {
        throw new Error("Method not implemented.");
    }
    async login(req: LoginDto): Promise<TokenResponse> {
        throw new Error("Method not implemented.");
    }
}