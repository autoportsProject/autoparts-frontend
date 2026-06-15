import { IUsersRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useProfile = (repo: IUsersRepo) => {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const {data: profile, isLoading, error} = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await repo.getMe();
            return res;
        },
        enabled: !!token,
        retry: false
    });

    return {
        profile,
        isLoading,
        serverError: error
    };
}