import { CategoryCreateDto, ICategoriesRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = (repo: ICategoriesRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: CategoryCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
        },
        onError: (error) => {
            console.error("Ошибка создания категории", error);
        }
    });

    return create;
}