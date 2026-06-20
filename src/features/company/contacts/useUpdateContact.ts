import { ContactUpdateDto, IContactsRepo } from "@/domain";
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
        },
        onError: (error) => {
            console.error("Ошибка обновления контакта", error);
        }
    });

    return update;
}