import { IUsersRepo, UserRoleUpdateDto } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: UserRoleUpdateDto;
}

export const useUpdateRole = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.updateRole(id, req),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["user", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления роли пользователя", error);
        }
    });

    return update;
}