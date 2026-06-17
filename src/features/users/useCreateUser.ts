import { IUsersRepo, UserCreateDto } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateUser = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: UserCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
        onError: (error) => {
            console.error("Ошибка создания пользователя", error);
        }
    });

    return create;
}