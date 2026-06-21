import { ClientQuestionCreateDto, IAppealsRepo } from "@/domain";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

export const useCreateClientQuestion = (repo: IAppealsRepo) => {
    const create = useMutation({
        mutationFn: (req: ClientQuestionCreateDto) => repo.createQuestion(req),
        onSuccess: () => {
            notifications.show({
                title: "Успех",
                message: "Форма успешно отправлена",
                color: "green",
                position: "top-right"
            });
        },
        onError: (error) => {
            console.log("Ошибка создания обращения клиента", error);
        }
    });

    return create;
}