import { IAuthRepo, LoginDto, TokenResponse, UserRole } from "@/domain";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { normalizeRole } from "@/shared/utils/normalizeRole";

export const useLogin = (repo: IAuthRepo) => {
    const nav = useRouter();

    const login = useMutation({
        mutationFn: (req: LoginDto) => repo.login(req),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            const role = normalizeRole(data.role);
            if (role === UserRole.Admin || role === UserRole.Creator)
                nav.push("/admin");
            else nav.push("/");
        },
        onError: (error) => {
            console.error("Ошибка входа в систему", error);
        }
    });

    return login;
}