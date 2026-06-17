import { IContactsRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useContactDetails = (id: string, repo: IContactsRepo) => {
    const {data: contact, isLoading, error} = useQuery({
        queryKey: ["contact", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        contact,
        isLoading,
        serverError: error
    };
}