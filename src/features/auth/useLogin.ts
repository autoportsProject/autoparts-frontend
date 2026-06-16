import { IAuthRepo, LoginDto, TokenResponse, UserRole } from "@/domain";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export const useLogin = (repo: IAuthRepo) => {
    const nav = useRouter();

    const login = useMutation({
        mutationFn: (req: LoginDto) => repo.login(req),
        onSuccess: (data) => {
            console.log("success login", data);
            localStorage.setItem("token", data.token);
            if (data.role === UserRole.Admin || data.role === UserRole.Creator)
                nav.push("/admin");
            else nav.push("/");
        },
        onError: (error) => {
            console.error("Login error", error);
        }
    });

    return login;
}