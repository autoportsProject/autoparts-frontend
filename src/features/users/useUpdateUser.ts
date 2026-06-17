import { IUsersRepo, UserUpdateDto } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: UserUpdateDto;
}

export const useUpdateUser = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["user", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления пользователя", error);
        }
    });

    return update;
}