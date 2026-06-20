import { ICertificatesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCertificate = (repo: ICertificatesRepo) => {
    const queryClient = useQueryClient();

    const del = useMutation({
        mutationFn: (id: string) => repo.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["certificate", id]
            });
            queryClient.invalidateQueries({
                queryKey: ["certificates"]
            });
            notifications.show({
                title: "Успех",
                message: "Сертификат успешно удален",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка удаления сертификата",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка удаления сертификата", error);
        }
    });

    return del;
}