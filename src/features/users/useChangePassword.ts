import { IUsersRepo, PasswordUpdateDto } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangePassword = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: PasswordUpdateDto) => repo.changePassword(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
            notifications.show({
                title: "Успех",
                message: "Пароль успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось изменить пароль. Проверьте текущий пароль",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка смены пароля", error);
        }
    });

    return create;
}