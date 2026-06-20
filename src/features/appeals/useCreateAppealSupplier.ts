import { CreateSupplierRequestDto, IAppealsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

export const useCreateSupplierRequest = (repo: IAppealsRepo) => {
    const create = useMutation({
        mutationFn: (req: CreateSupplierRequestDto) => repo.createSupplierRequest(req),
        onSuccess: () => {
            notifications.show({
                title: "Успех",
                message: "Заявка успешно отправлена. Мы свяжемся с Вами в ближайшее время",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка создания заявки поставщика",
                color: "red",
                position: "top-right"
            });
            console.error("Ошибка создания заявки поставщика", error);
        }
    });

    return create;
}