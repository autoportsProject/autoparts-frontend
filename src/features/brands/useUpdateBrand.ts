import { BrandUpdateDto, IBrandsRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: BrandUpdateDto;
}

export const useUpdateBrand = (repo: IBrandsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["brand", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления бренда", error);
        }
    });

    return update;
}