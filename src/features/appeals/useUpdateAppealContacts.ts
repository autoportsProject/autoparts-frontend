import { AppealContactsUpdateDto, IAppealsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: AppealContactsUpdateDto;
}

export const useUpdateAppealContacts = (repo: IAppealsRepo) => {
    const queryClient = useQueryClient();

    const updateContacts = useMutation({
        mutationFn: ({id, req}: Props) => repo.updateContacts(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["appeal", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["appeals"]
            });
            notifications.show({
                title: "Успех",
                message: "Контакты успешно обновлены",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления контактов обращения", error);
        }
    });

    return updateContacts;
}