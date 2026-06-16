import { CategoryUpdateDto, ICategoriesRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProps {
    id: string;
    req: CategoryUpdateDto;
}

export const useUpdateCategory = (repo: ICategoriesRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: UpdateProps) => repo.update(id, req),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["category", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
        }
    });

    return update;
}