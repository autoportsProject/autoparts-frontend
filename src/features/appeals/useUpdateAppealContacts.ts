import { AppealContactsUpdateDto, IAppealsRepo } from "@/domain";
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
        },
        onError: (error) => {
            console.error("Ошибка обновления контактов обращения", error);
        }
    });

    return updateContacts;
}