import { IAuthRepo, RegisterDto, UserRole } from "@/domain";
import { normalizeRole } from "@/shared/utils/normalizeRole";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegister = (repo: IAuthRepo) => {
    const nav = useRouter();

    const reg = useMutation({
        mutationFn: (req: RegisterDto) => repo.register(req),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            const role = normalizeRole(data.role);
            if (role === UserRole.Admin || role === UserRole.Creator)
                nav.push("/admin");
            else nav.push("/");
        },
        onError: (error) => {
            console.error("Ошибка регистрации", error);
        }
    });

    return reg;
}