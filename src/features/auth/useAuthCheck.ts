import { IUsersRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useAuthCheck = (repo: IUsersRepo) => {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);
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
        isLoading: !token || isLoading,
        serverError: error
    };
}