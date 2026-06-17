import { BrandCreateDto, IBrandsRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBrand = (repo: IBrandsRepo) => {
    const queryClient = useQueryClient();
    
    const create = useMutation({
        mutationFn: (req: BrandCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            });
        },
        onError: (error) => {
            console.error("Ошибка создания бренда", error);
        }
    });

    return create;
}