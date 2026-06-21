import { CertificateUpdateDto, ICertificatesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: CertificateUpdateDto;
}

export const useUpdateCertificate = (repo: ICertificatesRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["certificate", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["certificates"]
            });
            notifications.show({
                title: "Успех",
                message: "Сертификат успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления сертификата", error);
        }
    });

    return update;
}