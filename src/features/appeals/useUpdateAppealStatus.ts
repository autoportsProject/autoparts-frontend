import { AppealStatusUpdateDto, IAppealsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: AppealStatusUpdateDto;
}

export const useUpdateAppealStatus = (repo: IAppealsRepo) => {
    const queryClient = useQueryClient();

    const updateStatus = useMutation({
        mutationFn: ({id, req}: Props) => repo.updateStatus(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["appeal", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["appeals"]
            });
            notifications.show({
                title: "Успех",
                message: "Статус обращения успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления статуса обращения", error);
        }
    });

    return updateStatus;
}