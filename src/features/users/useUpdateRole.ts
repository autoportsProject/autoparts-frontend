import { IUsersRepo, UserRoleUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: UserRoleUpdateDto;
}

export const useUpdateRole = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.updateRole(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["user", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            notifications.show({
                title: "Успех",
                message: "Роль пользователя успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления роли пользователя", error);
        }
    });

    return update;
}