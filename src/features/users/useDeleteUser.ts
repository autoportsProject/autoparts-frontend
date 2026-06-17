import { IUsersRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["user", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления пользователя", error);
        }
    });

    return deleteMut;
}