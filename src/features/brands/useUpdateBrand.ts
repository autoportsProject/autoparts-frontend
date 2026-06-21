import { BrandUpdateDto, IBrandsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: BrandUpdateDto;
}

export const useUpdateBrand = (repo: IBrandsRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["brand", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["brands"]
            });
            notifications.show({
                title: "Успех",
                message: "Бренд успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка обновления бренда", error);
        }
    });

    return update;
}