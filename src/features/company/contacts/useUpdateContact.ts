import { ContactUpdateDto, IContactsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: ContactUpdateDto;
}

export const useUpdateContact = (repo: IContactsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["contact", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["contacts"]
            });
            queryClient.invalidateQueries({
                queryKey: ["company"]
            });
            notifications.show({
                title: "Успех",
                message: "Контакт успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления контакта", error);
        }
    });

    return update;
}