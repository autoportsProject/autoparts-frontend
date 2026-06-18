import { AttributeUpdateDto, IAttributesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    id: string;
    req: AttributeUpdateDto;
}

export const useUpdateAttrib = (repo: IAttributesRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: ({id, req}: Props) => repo.update(id, req),
        onSuccess: (_, vars) => {
            queryClient.invalidateQueries({
                queryKey: ["attribute", vars.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["attributes"]
            });
            notifications.show({
                title: "Успех",
                message: "Атрибут успешно обновлен",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления атрибута",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка обновления атрибута", error);
        }
    });

    return update;
}