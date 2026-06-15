import { IAuthRepo, LoginDto, TokenResponse } from "@/domain";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export const useLogin = (repo: IAuthRepo) => {
    const nav = useRouter();

    const login = useMutation({
        mutationFn: (req: LoginDto) => repo.login(req),
        onSuccess: (data) => {
            console.log("success login", data);
            localStorage.setItem("token", data.token);
            nav.push("/");
        },
        onError: (error) => {
            console.error("Login error", error);
        }
    });

    return login;
}