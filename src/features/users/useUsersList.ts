import { IUsersRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useUsersList = (repo: IUsersRepo) => {
    const {data: users, isLoading, error} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        users,
        isLoading,
        serverError: error
    };
}