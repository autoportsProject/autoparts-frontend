import { ICertificatesRepo } from "@/domain";
import { useQuery } from "@tanstack/react-query";

export const useCertificateDetails = (id: string, repo: ICertificatesRepo) => {
    const {data: certificate, isLoading, error} = useQuery({
        queryKey: ["certificate", id],
        queryFn: async () => {
            const res = await repo.getById(id);
            return res;
        },
        enabled: !!id,
        retry: false
    });

    return {
        certificate,
        isLoading,
        serverError: error
    };
}