import { IContactsRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteContact = (repo: IContactsRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["contact", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["contacts"]
            });
            queryClient.invalidateQueries({
                queryKey: ["company"]
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления контакта", error);
        }
    });

    return deleteMut;
}