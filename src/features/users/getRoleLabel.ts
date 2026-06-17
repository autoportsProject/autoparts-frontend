import { UserRole } from "@/domain";

export const getRoleLabel = (role: UserRole): string => {
    switch (role) {
        case 0:
            return "Администратор";
        case 1:
            return "Редактор";
        case 2:
            return "Пользователь";
        default:
            return "Неизвестно";
    }
}