import { IAttributesRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useAttribDetails = (id: string, repo: IAttributesRepo) => {
    const {data: attrib, isLoading, error} = useQuery({
        queryKey: ["attribute", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        attrib,
        isLoading,
        serverError: error
    };
}