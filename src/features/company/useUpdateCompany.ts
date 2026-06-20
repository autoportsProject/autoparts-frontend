import { CompanyUpdateDto, ICompanyRepo } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

export const useUpdateCompany = (repo: ICompanyRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (req: CompanyUpdateDto) => repo.update(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["company"]
            });
            notifications.show({
                title: "Успех",
                message: "Информация успешно обновлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка обновления информации",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка изменения информации о компании", error);
        }
    });
    
    return update;
}