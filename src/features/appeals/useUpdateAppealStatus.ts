import { AppealStatusUpdateDto, IAppealsRepo } from "@/domain";
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
        },
        onError: (error) => {
            console.error("Ошибка обновления статуса обращения", error);
        }
    });

    return updateStatus;
}