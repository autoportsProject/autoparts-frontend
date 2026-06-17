import { IContactsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useContactsList = (repo: IContactsRepo) => {
    const {data: contacts, isLoading, error} = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        contacts,
        isLoading,
        serverError: error
    };
}