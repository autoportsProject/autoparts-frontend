import { IUsersRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useAuthCheck = (repo: IUsersRepo) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const {data: user, isLoading, error} = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await repo.getMe();
            return res;
        },
        enabled: !!token,
        retry: false
    });

    const flag = !!token && user;
    return {
        authorized: flag,
        user: user ?? null,
        isLoading,
        serverError: error
    };
}