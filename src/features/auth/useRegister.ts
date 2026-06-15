import { IAuthRepo, RegisterDto, TokenResponse } from "@/domain";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegister = (repo: IAuthRepo) => {
    const nav = useRouter();

    const reg = useMutation({
        mutationFn: (req: RegisterDto) => repo.register(req),
        onSuccess: (data) => {
            console.log("success register", data);
            localStorage.setItem("token", data.token);
            nav.push("/");
        },
        onError: (error) => {
            console.error("Register error", error);
        }
    });

    return reg;
}