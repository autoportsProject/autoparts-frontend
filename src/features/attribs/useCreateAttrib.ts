import { AttributeCreateDto, IAttributesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAttrib = (repo: IAttributesRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: AttributeCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["attributes"]
            });
            notifications.show({
                title: "Успех",
                message: "Атрибут успешно создан",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка создания атрибута", error);
        }
    });

    return create;
}