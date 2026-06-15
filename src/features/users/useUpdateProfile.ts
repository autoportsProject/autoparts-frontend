import { IUsersRepo, ProfileUpdateDto } from "@/domain";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = (repo: IUsersRepo) => {
    const queryClient = useQueryClient();

    const update = useMutation({
        mutationFn: (req: ProfileUpdateDto) => repo.updateProfile(req),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            });
            alert("Успешно!");
        },
        onError: (error) => {
            alert("Ошибка обновления профиля");
            console.error("Profile update error", error);
        }
    });

    return update;
}