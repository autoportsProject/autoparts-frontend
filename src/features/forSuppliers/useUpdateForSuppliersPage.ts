import { ForSuppliersPageUpdateDto } from "@/domain/dto/forSuppliers";
import { IForSuppliersPageRepo } from "@/domain/repos/IForSuppliersPageRepo";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateForSuppliersPage = (repo: IForSuppliersPageRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (req: ForSuppliersPageUpdateDto) => repo.update(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["forSuppliers"]
            });
            notifications.show({
                title: "Успех",
                message: "Информация обновлена успешно",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления информации поставщикам", error);
        }
    });

    return update;
}