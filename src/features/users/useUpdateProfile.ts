import { IUsersRepo, ProfileUpdateDto } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (req: ProfileUpdateDto) => repo.updateProfile(req),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            alert("Успешно!");
        },
        onError: (error) => {
            console.error("Ошибка обновления профиля", error);
        }
    });

    return update;
}