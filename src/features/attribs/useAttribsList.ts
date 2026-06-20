import { IAttributesRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useAttribsList = (repo: IAttributesRepo) => {
    const {data: attribs, isLoading, error} = useQuery({
        queryKey: ["attributes"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        attribs,
        isLoading,
        serverError: error
    };
}

export const useAttribsListByCategory = (categoryId: string, repo: IAttributesRepo) => {
    const {data: attribs, isLoading, error} = useQuery({
        queryKey: ["attributes", categoryId],
        queryFn: async () => {
            const res = await repo.getByCategoryId(categoryId);
            return res;
        },
        enabled: !!categoryId,
        retry: false
    });

    return {
        attribs,
        isLoading,
        serverError: error
    };
}