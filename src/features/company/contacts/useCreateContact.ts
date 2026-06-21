import { ContactCreateDto } from "@/domain/dto/contact";
import { IContactsRepo } from "@/domain/repos/IContactsRepo";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateContact = (repo: IContactsRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: ContactCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["contacts"]
            });
            queryClient.invalidateQueries({
                queryKey: ["company"]
            });
            notifications.show({
                title: "Успех",
                message: "Контакт успешно создан",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка создания контакта", error);
        }
    });

    return create;
}