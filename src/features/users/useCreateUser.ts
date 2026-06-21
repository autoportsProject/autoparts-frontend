import { IUsersRepo, UserCreateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateUser = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: UserCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            notifications.show({
                title: "Успех",
                message: "Пользователь успешно создан",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка создания пользователя", error);
        }
    });

    return create;
}