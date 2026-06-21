import { IAttributesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAttrib = (repo: IAttributesRepo) => {
    const queryClient = useQueryClient();

    const deleteMut = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["attributes"]
            });
            queryClient.invalidateQueries({
                queryKey: ["attribute", id]
            });
            notifications.show({
                title: "Успех",
                message: "Атрибут успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка удаления атрибута", error);
        }
    });

    return deleteMut;
};