import { CertificateCreateDto, ICertificatesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCertificate = (repo: ICertificatesRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: CertificateCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["certificates"]
            });
            notifications.show({
                title: "Успех",
                message: "Сертификат успешно добавлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка добавления сертификата", error);
        }
    });

    return create;
}