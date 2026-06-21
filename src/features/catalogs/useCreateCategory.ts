import { CategoryCreateDto, ICategoriesRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = (repo: ICategoriesRepo) => {
    const queryClient = useQueryClient();

    const create = useMutation({
        mutationFn: (req: CategoryCreateDto) => repo.create(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"]
            });
            notifications.show({
                title: "Успех",
                message: "Категория успешно создана",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.error("Ошибка создания категории", error);
        }
    });

    return create;
}