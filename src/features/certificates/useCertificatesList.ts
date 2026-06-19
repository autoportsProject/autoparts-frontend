import { ICertificatesRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useCertificatesList = (repo: ICertificatesRepo) => {
    const {data: certificates, isLoading, error} = useQuery({
        queryKey: ["certificates"],
        queryFn: async () => {
            const res = await repo.getAll();
            return res;
        }
    });

    return {
        certificates,
        isLoading,
        serverError: error
    };
}