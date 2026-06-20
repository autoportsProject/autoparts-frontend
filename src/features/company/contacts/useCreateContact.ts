import { ContactCreateDto } from "@/domain/dto/contact";
import { IContactsRepo } from "@/domain/repos/IContactsRepo";
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
        },
        onError: (error) => {
            console.error("Ошибка создания контакта", error);
        }
    });

    return create;
}