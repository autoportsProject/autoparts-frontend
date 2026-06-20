import { IUsersRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useUserDetails = (id: string, repo: IUsersRepo) => {
    const {data: user, isLoading, error} = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        user,
        isLoading,
        serverError: error
    };
}